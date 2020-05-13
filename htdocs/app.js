class Spinner extends React.Component {
    constructor(props) {
        super(props);
        var self = this;
        
        this.sections = props.sections;
        this.odds = {};
        this.tour = {min:3, max: 10};
        
        this.section = {current: 0, max: this.sections.length};
        this.angle = {current: 0, section : (360 / this.section.max)};
        this.exclusion = Math.ceil(this.angle.section / 8);
        
        var self=this;
        this.sections.forEach(function(element){
            if(element.value > 0){
                self.odds[element.value] = {value: element.value, style : {backgroundColor: element.color}};
            }
        });
        
        var odd = Object.keys(this.odds);
        this.state = {
            odds : Object.assign({}, this.odds),
            odd : odd[odd.length-1],
            stake : {
                min : 10,
                max : 100,
                current : 100
            },
            outcome: 0,
            user: props.user,
            spin : 0,
            lock: false
        }
        
        if(this.state.user.auth){
            this.RenderLogout();
        }
        Object.assign(this.state.odds, {[this.state.odd] : { value: Number(this.state.odd), style : { backgroundColor:  this.odds[this.state.odd].style.backgroundColor, height: "60px", width: "60px", lineHeight: "60px"}}});
    }
    
    render(){
        var length = 230;
        var width = length * Math.tan((this.angle.section/2) * Math.PI / 180);
        var i = 0;
        
        return (
            <div className="row">
                <div className="col-lg-6 col-12" id="wheel-container">
                    <div id="wheel">
                        <div id="inner-wheel" style={{transform: 'rotate(' + this.state.spin + 'deg)' }}>
                            {this.sections.map((section) => <this.RenderWheelSection key={i} value={section} angle={i++ * this.angle.section} length={length} width={width}/>)}
                        </div>
                        <div id="spin" onClick={(e) => this.SpinWheel(e)}>Spin<br/>&amp;<br/>Multiply</div>
                    </div>
                </div>
                <div className="col-lg-6 col-12" id="form-container">
                    <form id="play">
                        <div className="col-12">Choose your odds</div>
                        <div className="col-12" id="odds">
                        {
                            Object.keys(this.state.odds).map(
                                (odd) => <span className="odd" key={odd} onClick={(e) => this.SetOdds(odd, e)} style={this.state.odds[odd].style}>X{odd}</span>
                            )
                        }
                        </div>
                        <hr/>
                        <div className="col-12">Enter amount to stake</div>
                        <div className="row col-12" id="stake">
                            <div className="row col-12">
                                <div className="col-6"><label htmlFor="stake" className="col-6">Stake:</label><input id="stake" className="col-5" type="number" onChange={(e) => this.SetStake(e)} defaultValue={this.state.stake.current} min={this.state.stake.min} max={this.state.stake.max}/></div>
                                <div className="col-6"><label htmlFor="stake">Possible win: {this.state.odd * this.state.stake.current}</label></div>
                            </div>
                        </div>
                        <hr/>
                        <div className="col-12" id="spin-btn">
                            <span id="click2spin" onClick={(e) => this.SpinWheel()}>Click to SPIN!</span>
                        </div>
                        <div className="col-12" id="balance">
                            <span>Balance: {this.state.user.balance}</span>
                        </div>
                    </form> 
                </div> 
            </div>
        );
    }
    RenderWheelSection(props){
        var angle = props.angle;
        var width = props.width;
        var length = props.length;

        var top = 192 - length;
        var left= 192 - width;
        const style = {
            transform:  `rotate(${angle}deg)`,
            WebkitTransform: `rotate(${angle}deg)`,
            MozTransform: `rotate(${angle}deg)`,
            OTransform: `rotate(${angle}deg)`,
            msTransform: `rotate(${angle}deg)`,
            borderColor: `${props.value.color} transparent`,
            borderWidth: `${length}px ${width}px 0`,
            transformOrigin: `${width}px ${length}px`,
            top: `${top}px`,
            left: `${left}px`,
        };
        return <div style={style}><span>{props.value.title}</span></div>; 
    }
    RenderLogin(){
        ReactDOM.render(
            (
                <div className="swal-overlay swal-overlay--show-modal">
                    <div className="swal-modal" role="dialog" aria-modal="true">
                        <div className="swal-title">Login</div>
                        <div className="swal-text">
                            <input type="text" name="username" id="username" placeholder="Username" defaultValue={this.state.user.username} onChange={(e) => this.SetUser({username: e.target.value.trim()})} />
                            <input type="password" name="password" id="password" placeholder="Password" autoComplete="true" defaultValue={this.state.user.password} onChange={(e) => this.SetUser({password: e.target.value.trim()})}/>
                        </div>
                        <div className="swal-footer">
                            <div className="swal-button-container">
                                <button className="swal-button" onClick={(e) => this.CloseOverlay(e)}>Cancel</button>
                            </div>
                            <div className="swal-button-container">
                                <button className="swal-button" onClick={(e) => this.LoginAction(e)}>Login!</button>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            document.getElementById('overlay')
        );
    }
    RenderLogout(){
        ReactDOM.render(
            (
                <span onClick={(e) => this.LogoutAction(e)}>Logout</span>
            ),
            document.getElementById('logout')
        );
    }
    RenderRegister(){
        ReactDOM.render(
            (
                <div className="swal-overlay swal-overlay--show-modal">
                    <div className="swal-modal" role="dialog" aria-modal="true">
                        <div className="swal-title">Register</div>
                        <div className="swal-text">
                            <input type="text" name="username" id="username" placeholder="Username" defaultValue={this.state.user.username} onChange={(e) => this.SetUser({username: e.target.value.trim()})}/>
                            <input type="email" name="email" id="email" placeholder="E-mail" defaultValue={this.state.user.email} onChange={(e) => this.SetUser({email: e.target.value.trim()})}/>
                            <input type="password" name="password" id="password" placeholder="Password" autoComplete="false" defaultValue={this.state.user.password} onChange={(e) => this.SetUser({password: e.target.value.trim()})}/>
                        </div>
                        <div className="swal-footer">
                            <div className="swal-button-container">
                                <button className="swal-button" onClick={(e) => this.CloseOverlay(e)}>Cancel</button>
                            </div>
                            <div className="swal-button-container">
                                <button className="swal-button" onClick={(e) => this.RegisterAction(e)}>Register!</button>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            document.getElementById('overlay')
        );
    }
    RenderResult(){
        var message = "You lose better luck next time!";
        var type = "info";
        switch(this.state.outcome) {
          case "Spin":
            message = "You're lucky you won another try!";
            type = "success"
            break;
          default:
            var newbal = this.state.user.balance-this.state.stake.current;
            if(this.state.outcome == this.state.odd){
                newbal += (this.state.odd * this.state.stake.current);
                message = "Congratulations you won!";
                type = "success"
            }
            this.state.user.balance = newbal;
            this.setState({user: this.state.user });
        }
        this.setState({lock : false});
        swal("Spin complete!", message, type);        
    }
    CloseOverlay(){
        ReactDOM.render(
            <span/>,
            document.getElementById('overlay')
        );
    }

    SetOdds(v, e){
        e.preventDefault();
        if(this.state.lock){
            swal("Please wait!", "Please wait for spin to complete before changing the value","info");
        }else{
            Object.assign(this.state.odds, this.odds);
            Object.assign(this.state.odds, {[v] : { value: Number(v), style : { backgroundColor:  this.odds[v].style.backgroundColor, height: "60px", width: "60px", lineHeight: "60px"}}});

            this.setState({odds: this.state.odds, odd : v });               
        }
    }
    SetStake(e){
        if(this.state.lock){
            swal("Please wait!", "Please wait for spin to complete before changing the value","info");
        }else{
            this.setState({stake: Object.assign(this.state.stake, {current :  Number(e.target.value)}) });     
        }
    }
    SetUser(value){
        Object.assign(this.state.user, value);
        this.setState({user : this.state.user });
    }
    SpinWheel(){
        if(this.state.lock){
            swal("Please wait!", "Please wait for spin to complete before spinning again","info");
        }
        else if(!this.state.user.auth){
            swal(
                "You are in demo mode, no gain can be claimed, please login or register before playing.", 
                {
                    buttons: {
                        login: {
                            text: "Login!",
                            value: "login",
                        },
                        register: {
                            text: "Register!",
                            value: "register",
                        },
                        demo: {
                            text: "Continue demo",
                            value: "demo",
                        }
                    }
                }
            )
            .then(
            (value) => {
                switch (value) {
                case "login":
                    this.RenderLogin();
                    break;
                case "register":
                    this.RenderRegister();
                    break;
                default:
                    this.SpinWheelAction();
                }
            });
        }else{
            this.SpinWheelAction();
        }
    }
    SpinAngle(){
        var value = Math.floor(Math.random() * ((this.angle.section - this.exclusion)/2));
        if(Math.random()< 0.5){
            value = value * -1;
        }
        return value;    
    }
    SpinWheelAction(){
        if(this.state.user.balance >= this.state.stake.current){
            this.setState({lock : true});
            this.tour.spin = Math.floor(Math.random() * (this.tour.max - this.tour.min)) + this.tour.min;
            this.angle.spin = this.SpinAngle();
            
            var self = this;
            $.get("/spin/test/" + this.state.odd + "/" + this.state.stake.current)
            .done(function(data) {
                var result = jQuery.parseJSON(data);                
                self.section.spin = result.spin;
                
                var total_angle_spin = ((Math.ceil(self.state.spin / 360) + self.tour.spin)*360) +
                (self.section.spin * self.angle.section) +
                self.angle.spin;
                
                self.section.current = self.section.max - self.section.spin;

                self.setState({
                    spin: total_angle_spin
                    , outcome: self.sections[self.section.current].value
                });
                
                setTimeout(
                    function(){
                        self.RenderResult();
                    }
                    ,6500
                );
            })
            .fail(function(e) {
                swal("Error", "An error occured, please refresh the page or try again later.");
            });  
        }
        else if(!this.ValidateSpin()){
            swal("Insufficient fund!", "Your balance is insuficient for this bet, kindly refill your account or lower your bet","error");
        }        
    }

    LoginAction(e){
        if(this.state.user.username!="" && this.state.user.password!=""){
            var self = this;
            $.post("/login", this.state.user)
            .done(function(data) {
                var response = jQuery.parseJSON(data);
                self.setState({user : response});
                self.CloseOverlay();
                if(!self.state.user.auth){
                    swal(
                        "You have inserted wrong credentials, kindly try again.", 
                        {
                            buttons: {
                                ok: {
                                    text: "Ok",
                                    value: "ok",
                                }
                            }
                        }
                    )
                    .then(
                    (value) => {
                        switch (value) {
                        case "ok":
                            self.RenderLogin();
                            break;
                    }
                    });
                }else{
                    self.RenderLogout();
                    swal("Welcome back","Happy to see you again. Ready to spin the wheeeeeeeel!!!!");
                }
            })
            .fail(function() {
                swal("Error", "An error occured, please try again later.");
            });
        }
    }
    LogoutAction(e){
        var self = this;
        $.post("/logout", this.state.user)
        .done(function(data) {
            swal("Goodbye","Come back soon");
            ReactDOM.render(
                <span/>,
                document.getElementById('logout')
            );
            self.setState({user : {auth : false, balance: 1000}});
        })
        .fail(function() {
            swal("Error", "An error occured, please try again later.");
        });
    }
    RegisterAction(e){   
        var self = this;
        $.post("/register", this.state.user)
        .done(function(data) {
            var response = jQuery.parseJSON(data);
            self.setState({user : response});
            self.CloseOverlay();
            if(!self.state.user.auth){
                swal(
                    "Username already in use, is it your account?, try login.", 
                    {
                        buttons: {
                            ok: {
                                text: "Ok",
                                value: "ok",
                            }
                        }
                    }
                )
                .then(
                (value) => {
                    switch (value) {
                    case "ok":
                        self.RenderRegister();
                        break;
                }
                });
            }else{
                self.RenderLogout();
                swal("Welcome","Happy to see you. Ready to spin the wheeeeeeeel!!!!");
            }
        })
        .fail(function() {
            swal("Error", "An error occured, please try again later.");
        });
    }
}

$(document).ready(function () {
    console.log('%cStop!', 'color:red; font-size:60px; font-weight: bold; -webkit-text-stroke: 1px black;');
    console.log("%cThis is a browser feature intended for developers. If someone told you to copy and paste something here to enable any feature or \"hack\" someone's account, it is a scam and will give them access to your account.", 'font-size: 18px;');
    
    $.get("/game/test")
    .done(function(data) {
        var result = jQuery.parseJSON(data);
        ReactDOM.render(
            <Spinner sections={result.game.sections} user={result.user}/>,
            document.getElementById('body')
        );
    })
    .fail(function(e) {
        swal("Error", "An error occured, please refresh the page or try again later.");
    });
});