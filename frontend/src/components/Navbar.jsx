import React, { useContext, useState } from "react";
import Logo from "../assets/ConcertCopper.png";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const NAVBAR_HEADER = "text-2xl font-semibold hover:cursor-pointer hover:text-dark ease-in duration-300";

const Navbar = () => {
	const navigate = useNavigate();
	const {user, setUser} = useContext(UserContext);
    const [modal, setModal] = useState(false);
    const [form, setform] = useState({
        email: "",
        first: "",
        last: "",
        stage: "",
        manager: ""
      });
	const handleClick = (path) => {
		navigate(path);
	}

    function handler(event) {
        setform((prevForm) => {
          return {
            ...prevForm,
            [event.target.name]: event.target.value,
          };
        });
      }
    function handleSignOut(){
        setUser({signedIn: false, adminFlag: false});
        navigate("/");
    }
    const LABEL = "block text-dark/50 font-semibold text-2xl";
    const INPUT_FIELD = "rounded-md pl-3 h-14 w-full border-solid border-2 border-dark/50 mb-4 text-lg";
	return (
		<div className="fixed bg-primary flex flex-row w-screen text-white justify-between items-center px-10 py-2 rounded-b-lg">
			<img className="w-24 hover:cursor-pointer" onClick={() => handleClick("/")} src={Logo}/>
			<div className="flex flex-row space-x-12">
				{user.signedIn ? 
                    <div className="flex gap-14">
                        {user.adminFlag && <h2 className={NAVBAR_HEADER} onClick={() => {setModal(prev => !prev)}}>DASHBOARD</h2>}
                        <h2 className={NAVBAR_HEADER} onClick={handleSignOut}>SIGN OUT</h2>
                    </div>:
                    <div className="flex gap-14">
                        <h2 className={NAVBAR_HEADER} onClick={() => handleClick("/register")}>CREATE ACCOUNT</h2>
                        <h2 className={NAVBAR_HEADER} onClick={() => handleClick("/login")}>LOG IN</h2>
                    </div>
				}
			</div>
            {modal && 
                <div className="flex top-0 left-0 bg-dark/90 z-50 fixed h-screen w-screen items-center justify-center">
                    <div className="relative flex flex-col justify-center items-center w-1/2 h-[90%] bg-white rounded-lg px-20 py-10">
                        <h1 className="font-semibold text-dark/50 text-4xl">Add an Artist</h1>
                        <div onClick={() => setModal(prev => !prev)} className="absolute top-8 right-8 hover:cursor-pointer text-dark">
                            <CloseIcon sx={{fontSize: 40}}/>
                        </div>
                        <form className="flex flex-col justify-center w-full h-full" onSubmit={() => {}}>
                            <label className={LABEL}>Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                className={INPUT_FIELD}
                                onChange={handler}
                            ></input>
                            <label className={LABEL}>First Name</label>
                            <input
                                name="first"
                                type="text"
                                placeholder="First Name"
                                className={INPUT_FIELD}
                                onChange={handler}
                            ></input>
                            <label className={LABEL}>Last Name</label>
                            <input
                                name="last"
                                type="text"
                                placeholder="Last Name"
                                className={INPUT_FIELD}
                                onChange={handler}
                            ></input>
                            <label className={LABEL}>Stage Name</label>
                            <input
                                name="stage"
                                type="text"
                                placeholder="Stage Name"
                                className={INPUT_FIELD}
                                onChange={handler}
                            ></input>
                            <label className={LABEL}>Manager Email</label>
                            <input
                                name="manager"
                                type="text"
                                placeholder="Manager Email"
                                className={INPUT_FIELD}
                                onChange={handler}
                            ></input>
                            <button
                                className="h-14 w-full bg-primary rounded-md text-white text-2xl pl-3 hover:bg-primaryDark transition"
                                onClick={(e) => handleSubmit(e)}
                            >Add</button>  
                        </form>
                    </div>
                </div>
            }
		</div>
	)
}
export default Navbar;
