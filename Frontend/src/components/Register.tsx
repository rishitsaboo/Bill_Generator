import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";

interface RegisterForm{
    email:string,
    secretKey:string,
    password:string
}

const Register: React.FC = () => {
    const [ formData , setFormData ] = useState<RegisterForm> ({
        email:"",
        secretKey:"",
        password:"",
    });

    const [error, setError] = useState<string>("");

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
    
            setFormData((prev) => ({
                ...prev,
                [name]:value,   
            }));
        };
//handleSubmit
const navigate = useNavigate();
const hadleSubmit = async (e:React.FormEvent < HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.secretKey){
        setError("All fields are required");
      return;
    }
    try{
    const response = await fetch("http://localhost:3000/api/auth/register",{
        method:"POST",
        headers:{
            "content-Type":"application/json",
        },
        body:JSON.stringify({
            email:formData.email, 
            secretKey: formData.secretKey,
            password:formData.password,
            
        }),
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw Error(data.message || "Registration Failed");
    }
    alert("Admin registered Successfully")
    setError("");
    } 
    catch (err: any) {
      setError(err.message);
    }
}

return(
    <div className="flex justify-center item-center h-screen bg-gray-100">
        <form onSubmit={hadleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80">
            <h2 className="text-xl font-bold md-4 text-center">
                Admin Register
            </h2>
             {error && (
                <p className="text-red-500 text-sm mb-3 text-center">
                    {error}
                </p>
            )}
            <input 
            type = "email"
            name = "email"
            placeholder="Email"
            value = {formData.email}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            />
            <input 
            type = "text"
            name = "secretKey"
            placeholder="Admins Secret Key"
            value = {formData.secretKey}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            />
            <input 
            type = "password"
            name = "password"
            placeholder="Password"
            value = {formData.password}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
            />
            <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Register
            </button>
            <p className="text-sm text-center mt-3 text-gray-400">
                All ready loged in ?{""}
                <span
                    className="text-blue-500 hover:underline cursor-pointer"
                    onClick={() => navigate("/Login")}
                    >   
                    Sing in
                </span>
            </p>
        </form>
    </div>
    );
};

export default Register;