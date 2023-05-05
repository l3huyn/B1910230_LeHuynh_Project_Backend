//Khai báo thư viện express 
const express = require('express');
const router = express.Router();

//Khai báo đường dẫn qua file AccountController bên folder controller
const AccountController = require('../controllers/accountController');

//Khai báo các phương thức kèm đường dẫn 
router.post('/signup', AccountController.postAccount);
router.post('/login', AccountController.loginAccount);
router.get('/:id', AccountController.getOneAccount);
// router.patch('/:id', AccountController.updateOneAccount);

//Export 
module.exports = router;