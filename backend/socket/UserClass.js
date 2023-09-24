var method =  AuctionUser.prototype;
function AuctionUser(id,user, montant, app_id, photo , freeCredit ,participated) {
    this._appId = app_id;
    this._id = id;
    this._name = user;
    this._montant = montant; // this is the "remaining" in packUse model (NOT montant in user model)
    this._photo = photo;
    this._freeCredit = freeCredit;
    this._participated = participated
    
}

method.setMontant = function(montant) {
    this._montant = montant //updating user credit from data base
    
    return this._montant;
};
method.setFreeCredit = function(mise) {
    
    this._freeCredit = this._freeCredit - mise //taking from user free credit 
    
    return this._freeCredit;
};

module.exports = AuctionUser;