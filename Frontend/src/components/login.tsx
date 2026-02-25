import React ,{ useState }from "react";

interface LoginForm{
    email:string,
    password:string
}

const Login: React.FC = () => {
    const [formData,setFormData] = useState<LoginForm>({
        email:"",
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
// hadle Submit

const hadleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //simple validation
    if (!formData.email || !formData.password) {
        setError("All Fields are required");
        return;
    }
    try{
        const response = await fetch("http://localhost:3000/api/auth/login",{
        method: "POST",
        headers :{
            "Content-Type": "application/json", 
        },
        body:JSON.stringify(formData),
    }
    );
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || "Login Faild");
    }
    console.log("Success",data);
    }
    catch (err:any){
        setError(err.message);
    }
}
return (
    <div style={styles.container}>
      <form onSubmit={hadleSubmit} style={styles.form}>
        <h2>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    gap: "10px",
  },
  input: {
    padding: "8px",
  },
  button: {
    padding: "10px",
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
};

export default Login;