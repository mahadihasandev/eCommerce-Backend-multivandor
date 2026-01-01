function PasswordRegexEight(password){
    if(/[A-Za-z\d@$!%*?&]{8,}$/.test(password)){
        return true
    }
}

module.exports=PasswordRegexEight