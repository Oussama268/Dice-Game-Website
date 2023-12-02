import {useState} from 'react';

const Password = () => {


    const [pass,setPass] = useState()
    const [verpass,setVerPass] = useState()
    
    return (
        <div>
            password : <input type="password" onChange={(e) => {setPass(e.target.value)}}/>
            verify password : <input type="password" onChange={(e) => {setVerPass(e.target.value)}} />
            
            {
                pass !== verpass ?
                    <p>password dont match</p>
                :
                    null

            }
            
        </div>
    );
}

export default Password;
