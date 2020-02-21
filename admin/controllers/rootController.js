var {admins, users, pieces, config, orders} = require('gallery-repository');
var Util = require('../model/util');
var fetch = require('node-fetch');
const services = require('../model/servicesPath');

module.exports = {
    login: (req, res, next) => {

        const response = req.cookies.authorization_response || null;
        res.clearCookie('authorization_response');

        res.renderPage('login', {
            title: 'Login - Admin', 
            titleForm: 'Login',
            response: response
        });
    },
    loginVerify: (req, res, next) => {
        /*TODO: Clean username and password */
        const user = req.body.user.trim();
        const pass = req.body.pass.trim();
        const admin = new admins();

        admin.verify(user, pass).then(result => {
            console.log(result);
            if (result.length) {
                fetch(`${services.jwtHost}/api/generate/${result[0].username}/expiration/1h`)
                .then(jwtResponse => jwtResponse.json())
                .then(jwtResponse => {
                    if (jwtResponse.success) {
                        const jwtCookie = `auth_token=${jwtResponse.token}; Path=/; Max-Age=604800; HttpOnly;`;
                        res.header("Set-Cookie", jwtCookie);
                    } 
                    console.log('jwt generate response:', jwtResponse.message);
                    res.redirect('/');
                }).catch(error => {
                    console.log(error);
                    const response = 'Could not get authorization from jwt remote server, try later';
                    res.header("Set-Cookie", `authorization_response=${response}; Path=/; Max-Age=5000; HttpOnly;`);
                    res.redirect('/login');
                })
            } else {
                const response = 'The username or password is incorrect';
                res.header("Set-Cookie", `authorization_response=${response}; Path=/; Max-Age=5000; HttpOnly;`);
                res.redirect('/login');
            }
        }).catch(error => console.log(error));
    },
    logout: (req, res, next) => {

        res.clearCookie('auth_token');
        req.session.destroy();
        res.redirect('/login');
    },
    index: function(req, res, next) {

        const currentDate = Util.getCurrentDate();

        const order = new orders();
        const user = new users();
        const piece = new pieces();

        order.getTotals().then(result => {

            const profit = [];
            const totals = result[0];
            for (key in totals) {
                profit.push({
                    label: Util.camelCaseToPhrase(key), 
                    value: totals[key]
                });
            }
            console.log(profit);

            order.getTotalsByMonth(currentDate.year).then(result => {

                let profitByMonth = result.map((object) => {
                    let item = [];
                    item.push(object.month);
                    item.push(object.total);
                    return item;
                });
                console.log(profitByMonth);

                user.getGroupByCountry().then((result) => {
                    /* Convert a array of object to array of arrays */
                    let others = ['Others', 0];
                    let userByCountry = result.map((object) => {
                      let item = [];
      
                      if (Number(object.number) <= 1) {
                          others[1]++;
                          return;
                      }
                      item.push(object.country ? object.country : 'Unknown');
                      item.push(object.number);
                      return item;
                    }).filter(item => item !== undefined);
                    userByCountry.push(others);

                    user.getMouthYearSignin(currentDate.month, currentDate.year).then((result) => {
                        const userTable = result;

                        piece.getGroupByType().then((result) => {

                            let piecesByType = result.map((object) => {
                              let item = [];
                              item.push(object.type);
                              item.push(object.number);
                              return item;
                            });

                            piece.getGroupByYear().then((result) => {

                                let piecesReleasedYear = result.map((object) => {
                                  let item = [];
                                  item.push(object.year);
                                  item.push(object.number);
                                  return item;
                                });

                                res.renderPage('index', { 
                                    title: 'Admin - Art Gallery',
                                    profit: profit,
                                    profitByMonth: JSON.stringify(profitByMonth),
                                    userByCountry: JSON.stringify(userByCountry),
                                    currentDate: currentDate.halfText,
                                    data: userTable,
                                    piecesByType: JSON.stringify(piecesByType),
                                    piecesReleasedYear: JSON.stringify(piecesReleasedYear)
                                });
                            });
                        });
                    });
                });
            });
        });
    },
    getDocuments: (req, res, next) => {
        fetch(`${services.imagesHost}/api/summary/`)
        .then(response => response.json())
        .then(body => {
            res.renderPage(
                'documents', 
                { 
                    title: 'Documents', 
                    files: body
                }
            );
        });
    },
    getProfile: (req, res, next) => {
        const response = req.cookies.admin_response || null;
        res.clearCookie('admin_response');

        admin = new admins();
        admin.getByUsername(req.session.adminUsername).then((result) => {
            let profile = null;

            if (result.length) {
                profile = result[0];
                profile.registration_date = Util.getDateFromDatetime(profile.registration_date);
                profile.birth = Util.getDateFromDatetime(profile.birth);
            }

            res.renderPage(
                'profile', { 
                    title: 'Profile User Info', 
                    profile: profile,
                    result: response
                }
            );
        });
    },
    getIncomingMessages: function(req, res, next) {
        /*TODO: need to hide the mailtrap.io token and set it from configuration*/
        let headers = {
            "Api-Token": process.env.MAILTRAP_API_TOKEN,
            "Accept": "application/json",
            "Content-Type": "application/json"
        };

        let txtHeaders = {
            "Api-Token": process.env.MAILTRAP_API_TOKEN,
            "Accept": "text/plain",
        };

        fetch(
            `${process.env.MAILTRAP_HOST}/api/v1/inboxes`,
            {
                method: 'GET', 
                headers: headers
            }
        ).then(response => response.json())
         .then(content => {

            if (typeof content.error !== 'undefined') {
                res.renderPage(
                    'messages', { 
                        title: 'Inbox messages',
                        error: content.error
                    });
                return;
            }

            if (!content.length) {
                res.renderPage('messages', { 
                    title: 'Inbox messages', 
                    error: 'Content is empty'
                });
                return;
            }

            /*Saving the counter of messages */
            Util.getValueOfStorage(
                'READED_MESSAGES_COUNTER', 
                (messagesCount) => {
                    if (isNaN(messagesCount)) {
                        console.log('Could not found the COUNTER');
                        /*TODO: need the emiter */
                        global.currentEmailCounter = Number(content[0].emails_count);
                    } else {
                        /*TODO: need the emiter */
                        global.currentEmailCounter = Number(content[0].emails_count) - Number(messagesCount);
                    }
                },
                (error) => {
                    console.log(error);
                }
            );

            /* Taking the first inbox only, no several vendors */
            const inboxData = {
                id: content[0].id,
                name: content[0].name,
                count: content[0].emails_count
            }

            /*Get all the messages from the inbox */
            fetch(
                `${process.env.MAILTRAP_HOST}/api/v1/inboxes/${inboxData.id}/messages`,
                {
                    method: 'GET', 
                    headers: headers
                }
            ).then(response => response.json())
            .then(content => {

                let emailContents = [];
                let textRequests = [];

                content.forEach(element => {

                    let item = {
                        id : element.id,
                        subject: element.subject,
                        from: element.from_email,
                        sentAt: element.sent_at,
                        urlTextComment: process.env.MAILTRAP_HOST + element.txt_path
                    };

                    /*Saving messages in util table*/
                    Util.getValueOfStorage(element.id, (value) => {
                        if (value === 'empty') {
                            Util.setKeyValueInStorage(element.id, 0, 
                            (result) => {
                                console.log(result);
                                console.log(`Message id: ${element.id} saved`);
                            },
                            (error) => {
                                console.log('Couln\'t save message id ' + error);
                            });
                        }
                    }, 
                    (error) => console.log(error)
                    );

                    textRequests.push(
                        fetch(item.urlTextComment, {method: 'GET', headers: txtHeaders}).then(response => response.text())
                    );

                    emailContents.push(item);
                });

                /**Get all the messages bodys */
                Promise.all(textRequests)
                .then(texts => {

                    texts.forEach((text, index) => {
                        emailContents[index].text = text;
                    });
                })
                .catch (error => console.log(error))
                .finally(() => {
                    res.renderPage('messages', { 
                        title: 'Inbox messages', 
                        box: inboxData, 
                        messages: emailContents, 
                        error: null
                    });
                });

            })
            .catch (error => console.log(error));
        })
        .catch (error => {
            console.log(error);
            res.renderPage('messages', { 
                title: 'Inbox messages', 
                error: error
            });
        });
    },
    getConfiguration: (req, res, next) => {

        const response = req.cookies.option_response || null;
        res.clearCookie('option_response');

        const oConfig = new config;
        oConfig.getAll().then((result) => {
            res.renderPage(
                'configuration', 
                { 
                    title: 'Global Configuration', 
                    config: result,
                    response: response
                }
            );
        });
    },
    configurationUpdate: (req, res, next) => {
        const oConfig = new config;
        let response = {};
        let options = JSON.parse(JSON.stringify(req.body));

        console.log(options);

        oConfig.batchUpdate(options).then(results => {
            response = {
                data: options,
                success: true,
                message: 'The options were was updated sucessfully.'
            };
            console.log(results);
            fetch(`${services.appHost}/remote/update-config/`)
            .then(response => response.json())
            .then(body => {
               console.log('response from app', body);
            });
        })
        .catch(error => {
            console.log(error);
            response = {
                data: options,
                success: false,
                message: error.sqlMessage
            };
        })
        .finally(() => {
            res.cookie('option_response' , response, {maxAge: 20000});
            res.redirect( req.header('Referer') || '/');
        });
    }
};