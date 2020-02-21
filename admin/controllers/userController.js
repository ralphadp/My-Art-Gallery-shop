var {admins, users} = require('gallery-repository');
var ConfigHandler = require('../model/configHandler');
var Util = require('../model/util');

module.exports = {
    getUsers: (req, res, next) => {

        const response = req.cookies.user_response || null;
        res.clearCookie('user_response');

        const user = new users();

        user.getAll().then((result) => {
            res.renderPage(
                'users', 
                { 
                    title: 'External Users', 
                    tableTitle: 'Users', 
                    data: result,
                    response: response
                }
            );
        });
    },
    getAdmin: (req, res, next) => {

        const response = req.cookies.admin_response || null;
        res.clearCookie('admin_response');

        const admin = new admins();
        admin.getAll().then((result) => {
            res.renderPage(
                'admins', 
                { 
                    title: 'Internal Users', 
                    tableTitle: 'Admins', 
                    data: result,
                    response: response
                }
            );
        });
    },
    newUserForm: (req, res, next) => {
        const response = req.cookies.user_response || null;
        res.clearCookie('user_response');

        res.renderPage(
            'users-form', {
                title: 'Users', 
                titleForm: 'New User',
                result: response,
                dataToUpdate: null
            }
        );
    },
    newAdminForm: (req, res, next) => {
        const response = req.cookies.admin_response || null;
        res.clearCookie('admin_response');
      
        res.renderPage(
            'admins-form', {
                title: 'Admin', 
                titleForm: 'New Admin',
                result: response,
                dataToUpdate: null
            }
        );
    },
    saveUser: (req, res, next) => {

        const user = new users();

        const userParam = {
          photo: req.body.photo,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          birth: req.body.birth,
          username: req.body.username,
          password: req.body.password,
          registration_date: req.body.registration_date,
          email: req.body.email,
          gender: req.body.gender,
          movile: req.body.movile,
          country: req.body.country,
          city: req.body.city,
          postal_code: req.body.postal_code
        };

        let response = {};

        user.save(userParam).then(result => {
            response = {
                success: true,
                message: 'The user was added sucessfully.'
            };
            console.log(result);
        })
        .catch(error => {
            console.log(error);
            response = {
                success: false,
                message: error.sqlMessage
            };
        })
        .finally(() => {
            res.cookie('user_response' , response, {maxAge: 20000});
            res.redirect( req.header('Referer') || '/');
        });
    },
    saveAdmin: (req, res, next) => {

        const admin = new admins();

        const adminParam = {
          photo: req.body.photo,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          birth: req.body.birth,
          username: req.body.username,
          password: req.body.password,
          registration_date: req.body.registration_date,
          email: req.body.email,
          email2: req.body.email2,
          gender: req.body.gender,
          movile: req.body.movile,
          movile2: req.body.movile2,
          country: req.body.country,
          city: req.body.city,
          postal_code: req.body.postal_code
        };

        let response = {};

        admin.save(adminParam).then(result => {
            response = {
                success: true,
                message: 'The admin was added sucessfully.'
            };
            console.log(result);
        })
        .catch(error => {
            console.log(error);
            response = {
                success: false,
                message: error.sqlMessage
            };
        })
        .finally(() => {
            res.cookie('admin_response' , response, {maxAge: 20000});
            res.redirect( req.header('Referer') || '/');
        });
    },
    editUser: (req, res, next) => {

        const response = req.cookies.user_response || null;
        res.clearCookie('user_response');

        const user = new users();

        user.getById(req.params.id)
        .then((userResult) => {
            let dataToUpdate = !response ? (userResult[0] || null) : response.data;

            dataToUpdate.registration_date = Util.getDateFromDatetime(dataToUpdate.registration_date);
            dataToUpdate.birth = Util.getDateFromDatetime(dataToUpdate.birth);

            res.renderPage(
                'users-form', {
                    title: 'Users', 
                    titleForm: 'Update User',
                    result: response,
                    dataToUpdate: dataToUpdate
                }
            );
        })
        .catch((error) => {
            console.log(error);
        });
    },
    updateUser: (req, res, next) => {

        const user = new users();

        const userParam = {
          id: req.body.id,
          photo: req.body.photo,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          password: req.body.password,
          registration_date: req.body.registration_date,
          email: req.body.email,
          movile: req.body.movile, 
          birth: req.body.birth,
          gender: req.body.gender,
          country: req.body.country, 
          city: req.body.city,
          postal_code: req.body.postal_code
        };

        let response = {};

        user.update(userParam).then(result => {

            if (result.affectedRows) {
              response = {
                  data: userParam,
                  success: true,
                  message: 'The user was updated sucessfully.'
              };
            } else {
              response = {
                data: userParam,
                success: false,
                message: result.message
              };
            }
            console.log(result);
        })
        .catch(error => {
            console.log(error);
            response = {
                data: userParam,
                success: false,
                message: error.sqlMessage
            };
        })
        .finally(() => {
            res.cookie('user_response' , response, {maxAge: 20000});
            if (ConfigHandler.fetchValue('REDIRECT_UPDATE')) {
                res.redirect('/users/');
            } else {
                res.redirect( req.header('Referer') || '/');
            }
        });
    },
    editAdmin: (req, res, next) => {

        const response = req.cookies.admin_response || null;
        res.clearCookie('admin_response');

        const admin = new admins();

        admin.getById(req.params.id)
        .then((adminResult) => {
            let dataToUpdate = !response ? (adminResult[0] || null) : response.data;

            dataToUpdate.registration_date = Util.getDateFromDatetime(dataToUpdate.registration_date);
            dataToUpdate.birth = Util.getDateFromDatetime(dataToUpdate.birth);

            res.renderPage(
                'admins-form', {
                    title: 'Admin', 
                    titleForm: 'Update Admin',
                    result: response,
                    dataToUpdate: dataToUpdate
                }
            );
        })
        .catch((error) => {
            console.log(error);
        });
    },
    updateAdmin: (req, res, next) => {

        const admin = new admins();

        const adminParam = {
          id: req.body.id,
          photo: req.body.photo,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          password: req.body.password,
          registration_date: req.body.registration_date,
          email: req.body.email,
          email2: req.body.email2,
          movile: req.body.movile, 
          movile2: req.body.movile2, 
          birth: req.body.birth,
          gender: req.body.gender,
          country: req.body.country, 
          city: req.body.city,
          postal_code: req.body.postal_code
        };

        let response = {};

        admin.update(adminParam).then(result => {
      
            if (result.affectedRows) {
              response = {
                  data: adminParam,
                  success: true,
                  message: 'The admin was updated sucessfully.'
              };
            } else {
              response = {
                data: adminParam,
                success: false,
                message: result.message
              };
            }
            console.log(result);
        })
        .catch(error => {
            console.log(error);
            response = {
                data: adminParam,
                success: false,
                message: error.sqlMessage
            };
        })
        .finally(() => {
            res.cookie('admin_response' , response, {maxAge: 20000});
            if (typeof req.body.profile !== 'undefined' && req.body.profile) {
                res.redirect( req.header('Referer') || '/');
            } else {
                if (ConfigHandler.fetchValue('REDIRECT_UPDATE')) {
                    res.redirect('/users/admin/');
                } else {
                    res.redirect( req.header('Referer') || '/');
                }
            }
        });
    },
    deleteUser: (req, res, next) => {

        const user = new users();

        user.delete(req.body.id)
        .then(result => {
            response = {
                success: true,
                message: 'The user was removed sucessfully.'
            };
            console.log(result);
        })
        .catch(error => {
        console.log(error);
            response = {
                success: false,
                message: error.sqlMessage
            };
        })
        .finally(() => {
            res.cookie('user_response' , response, {maxAge: 20000});
            res.redirect('/users/');
        });
    },
    deleteAdmin: (req, res, next) => {

        const admin = new admins();

        admin.delete(req.body.id)
        .then(result => {
            response = {
                success: true,
                message: 'The admin was removed sucessfully.'
            };
            console.log(result);
        })
        .catch(error => {
        console.log(error);
            response = {
                success: false,
                message: error.sqlMessage
            };
        })
        .finally(() => {
            res.cookie('admin_response' , response, {maxAge: 20000});
            res.redirect('/users/admin');
        });
    },
    searchUsers: (req, res, next) => {

        const response = req.cookies.user_response || null;
        res.clearCookie('user_response');

        const words = req.params.textPattern.split('+');
        const pattern = words.join('|');
        const phrase = words.join(' ');

        const user = new users();

        user.getAllSearching(pattern).then((result) => {
            res.renderPage(
                'users', 
                { 
                    title: `External Users search by: "${phrase}" `, 
                    tableTitle: 'Users', 
                    data: result, 
                    response: response,
                    searchText: phrase
                }
            );
        });
    },
    searchAdmin: (req, res, next) => {

        const response = req.cookies.admin_response || null;
        res.clearCookie('admin_response');

        const words = req.params.textPattern.split('+');
        const pattern = words.join('|');
        const phrase = words.join(' ');

        const admin = new admins();

        admin.getAllSearching(pattern).then((result) => {
            res.renderPage(
                'admins', 
                { 
                    title: `Internal admins search by: "${phrase}" `, 
                    tableTitle: 'Admins', 
                    data: result, 
                    response: response,
                    searchText: phrase
                }
            );
        });
    }
};