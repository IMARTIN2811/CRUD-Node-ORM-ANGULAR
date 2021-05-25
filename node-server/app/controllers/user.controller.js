//funciones para realizar test de las autorizaciones

//permite dar acceso a todos 
exports.AllAccess = (req, res) =>{
    res.status(200).send("Public content");
};

//para opcion de usuario 
exports.User = (req, res) =>{
    res.status(200).send("User content");
};

//para la opcion de admin
exports.Admin = (req, res) =>{
    res.status(200).send("Admin content");
};

//para opcion de empleado
exports.Employ = (req,res) =>{
    res.status(200).send("Employee content");
};
