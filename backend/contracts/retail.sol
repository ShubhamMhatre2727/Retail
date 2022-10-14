// list error hai 
// ine 62

pragma solidity ^0.8.12;

contract Retail {
    address contractOwner = 0x9FA5d84C3ABbf41bA75BeAF136916CE0475D5b2a;
    
    // --------------- Land Inspector ------------------
    // land inspector structure
    struct landInspector {
        uint lid;
        address addr;
        string name;
        uint age;
        string designation;
        bool isLandInspector;
    }

    // ============
    // declaring array of land inspectors address
    landInspector[] public landInspectorsList;


    struct inspector_data {
        uint lid;
        bool isLandInspector;
    }
    // decalred dictionary for users
    mapping(address => inspector_data) public landInspectors;

    // add land inspector
    function addLandInspector(address addr, string memory name, uint age) public {
        if(contractOwner == msg.sender && !isLandInspector(addr)){
            // =======
            uint lid = landInspectorsList.length;
            landInspectors[addr] = inspector_data(lid, true);
            landInspectorsList.push(landInspector(lid, addr, name, age, 'sub-registrar', true));
        }
    }

    // verifies inspectors existance
    function isLandInspector(address addr) public view returns(bool){
        if(landInspectors[addr].isLandInspector){
            return true;
        }
        else {
            return false;
        }
    }

    // get land inspectors list
    function getLandInspectors() public view returns(landInspector[] memory){
        if(msg.sender == contractOwner){
            return landInspectorsList;
        }
    }

    // ------------------- User --------------------
    // user structer
    struct user {
        address addr;
        string name;
        uint age;
        uint256 phone;
        string identity;
        bool isVerified;
        bool isUser;
    }

    user[] public usersList;

    struct users_data{
        uint uid;
        bool isUser;
    }
    mapping(address => users_data) public users;

    // add user
    function addUser(address addr, string memory name, uint age, uint256 phone, string memory identity) public {
        if(isLandInspector(msg.sender) || msg.sender == contractOwner){
            uint uid = usersList.length;
            usersList.push(user(addr, name, age, phone, identity, false, true));
            users[addr] = users_data(uid, true);
        }
    }

    function userExists(address addr) public view returns(bool){
        if(users[addr].isUser){
            return true;
        }
        else{ return false; }
    }

    // checks if user is verified or not
    function isUserVerified() public view returns(bool){
        if(users[msg.sender].isUser){
            if(usersList[users[msg.sender].uid].isVerified){
                return true;
            }
        }
    }

    // verify user
    function verifyUser(address addr) external{
        if(isLandInspector(msg.sender)){
            usersList[users[addr].uid].isVerified = !usersList[users[addr].uid].isVerified;
        }
    }

    // get list of users address
    function getUsers() public view returns(user[] memory ){
        return usersList;
    }

    function getUser() external view returns(user memory){
        if(userExists(msg.sender)){
            return(usersList[users[msg.sender].uid]);
        }
    }

    // ---------------------------- Land ----------------------------
    // declared land structure
    struct land {
        uint landId;
        address ownerAddr;
        uint area;
        uint price;
        string place;
        string location;
        string landImage;
        string doc;
        string supportingDoc;
        bool isForSell;
        bool isLandVerified;
    }

    // declared land list
    land[] public landList;
    // declared lands directory containing their owners address
    mapping(uint => address) public lands;

    // function to add land details
    function addLand(uint area, uint256 price, string memory place, string memory location, string memory landImage, string memory doc, string memory supportingDoc) public{
        if(isUserVerified()){
            uint landId = landList.length;
            landList.push(land(landId, msg.sender, area, price, place, location, landImage, doc, supportingDoc, false, false));
            lands[landId] = msg.sender;
        }
    }

    // get all lands
    function getAllLands() public view returns(land[] memory){
        return landList;
    }

    // verification status of land
    function isLandVerified(uint landId) public view returns(bool){
        if(landList[landId].isLandVerified){
            return true;
        }
        else{ return false; }
    }

    // find land owner
    function isLandOwner(uint landId) public view returns(bool){
        if(lands[landId]==msg.sender){
            return true;
        }else{
            return false;
        }
    }

    // verify Land
    function verifyLand(uint landId) external{
        if(isLandInspector(msg.sender)){
            landList[landId].isLandVerified = !landList[landId].isLandVerified;
        }
    }

    // make land for sale
    function makeLandForSell(uint landId) external {
        if(landList[landId].isLandVerified && lands[landId] == msg.sender && isUserVerified()){
            landList[landId].isForSell = !landList[landId].isForSell;
        }
    }

    // Land Requests
    // declaring request dtructure
    enum reqStatus {Pending, Rejected, Accepted, Closed}
    struct landRequests{
        uint reqId;
        uint landId;
        address owner;
        string ownerName;
        address buyer;
        string buyerName;
        bool paymentDone;
        reqStatus requestStatus;
    }
    // declaring list of requests
    landRequests[] public reqList;

    // add request
    function addRequest(uint landId) public returns(bool) {
        if(isUserVerified()){
             uint rId = reqList.length;
             reqList.push(landRequests(rId, landId, landList[landId].ownerAddr, usersList[users[landList[landId].ownerAddr].uid].name, msg.sender, usersList[users[msg.sender].uid].name, false, reqStatus.Pending));
            return true;
        }else return false;
    }

    // get Land Requests
    function showRequests() public view returns(landRequests[] memory){
        // if(isUserVerified()){
        //     landRequests[] memory temporary = new landRequests[](reqList.length);
        //     uint counter=0;
        //     for(uint i=0; i<reqList.length; i++){
        //         if(reqList[i].owner == msg.sender || reqList[i].buyer == msg.sender){
        //             temporary[i] = reqList[i];
        //             counter++;
        //         }
        //     }

        //     landRequests[] memory userReqs = new landRequests[](counter);
        //     for(uint i=0; i<counter; i++){
        //         userReqs[i] = temporary[i];
        //     }

        //     return userReqs;
        // }
        return reqList;
    }

    // reject request
    function rejectRequest(uint rId) public {
        if(msg.sender == reqList[rId].owner && isUserVerified()){
            reqList[rId].requestStatus= reqStatus.Rejected;
        }
    }
    // accept request
    function acceptRequest(uint rId) public {
        if(msg.sender == reqList[rId].owner && isUserVerified()){
            reqList[rId].requestStatus= reqStatus.Accepted;
        }
        // rejecting all other requests send on this land
            for(uint i=0; i<reqList.length;i++){
                if(reqList[i].landId == reqList[rId].landId && reqList[i].buyer != reqList[rId].buyer && reqList[i].requestStatus != reqStatus.Closed){
                    reqList[i].requestStatus = reqStatus.Rejected;
                    // reqDataList[reqList[i].buyer].hasRequest = false;
                }
            }
    }

    // verify Payment
    function verifyPayment(uint reqId) public returns(bool){
        if(msg.sender == reqList[reqId].owner){
            reqList[reqId].paymentDone = !reqList[reqId].paymentDone;
            return true;
        }else return false;
    }

    // show approved request to inspector
    function showApprovedRequests() public view returns(landRequests[] memory){
        if(isLandInspector(msg.sender)){
            landRequests[] memory temporary = new landRequests[](reqList.length);
            uint counter =0;
            for(uint i=0; i<reqList.length;i++){
                if(reqList[i].requestStatus == reqStatus.Accepted && reqList[i].paymentDone){
                    temporary[counter] = reqList[i];
                    counter++;
                }
            }

            landRequests[] memory data = new landRequests[](counter);
            for(uint i=0; i<counter; i++){
                data[i] = temporary[i];
            }

            return data;
        }
    }

    // declaring structer for transactions
    struct transaction {
        uint tId;
        uint landId;
        address from;
        string fromName;
        address to;
        string toName;
    }
    // declaring transaction list to store all transactions
    transaction[] public transactions;

    // to transfer property
    function makeTransfer(uint rId) public returns(bool){
        if(isLandInspector(msg.sender) && reqList[rId].paymentDone && reqList[rId].requestStatus == reqStatus.Accepted && reqList[rId].owner==lands[reqList[rId].landId]){
            uint tId = transactions.length;

            // adding transaction
            transactions.push(transaction(tId, reqList[rId].landId, reqList[rId].owner, reqList[rId].ownerName, reqList[rId].buyer, reqList[rId].buyerName));
            reqList[rId].requestStatus = reqStatus.Closed;

            // transfering ownership and not enabling land for sell
            landList[reqList[rId].landId].ownerAddr = reqList[rId].buyer;
            lands[reqList[rId].landId] = reqList[rId].buyer;
            landList[reqList[rId].landId].isForSell = false;

            return true;
        }else return false;
    }

    // view transaction
    function showTransactions() public view returns(transaction[] memory){
        return transactions;
    }

    constructor(){
        // adding land inspector
        addLandInspector(0x65751938d5896A453CCa5815E3680c73Def0ea92, 'inspector1', 40);
        addUser(0xc81f0673E01be52D92278A907dc8d38CBC901C3a, 'seller', 20, 8652825534, 'https://bafybeid3ymkj66iwrolh2xiz73myg5qrglxjaolhpkv3dqdjumlilpsrhy.ipfs.dweb.link/TDS.pdf');
        addUser(0xC8E6Aa8354a0CE0cA175db92b821e6DBB98C7ba8, 'buyer', 20, 8652825534, 'https://bafybeibt3ex4x4ctht6pnxwm4blmloegiq67cwmwstzlwivlglmkzgwmha.ipfs.dweb.link/1.jpg');
        addUser(0x7dc7751B7439780d6607D04236CfAD6DF697d57F, 'user3', 25, 8652825534, 'https://bafybeibt3ex4x4ctht6pnxwm4blmloegiq67cwmwstzlwivlglmkzgwmha.ipfs.dweb.link/1.jpg');
        // addLand(1500, 500000);
    }

}