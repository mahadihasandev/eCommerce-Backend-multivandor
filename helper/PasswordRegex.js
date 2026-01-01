let PasswordRegex=(password)=>{
    if(/\d/.test(password)){
        return true
    }
}

module.exports=PasswordRegex