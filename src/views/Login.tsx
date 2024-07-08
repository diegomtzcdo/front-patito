import Input from "../components/Input";
import Button from "../components/Button";
import { useForm, FormProvider } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { User } from "../interfaces/User";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const methods = useForm();
    const { handleSubmit, formState: { errors } } = methods;

    const { signin, errors: authErrors, isAuthenticated } = useAuth();

    const navigate = useNavigate();
    
    useEffect(() => {
        if(isAuthenticated) {
            navigate("/productos");
        }
    }, [isAuthenticated]);

    const emailValidators = [
        { regex: /^\S+$/, message: 'El correo es requerido' },
        { regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Debe ser un correo valido' }
    ];

    const passwordValidators = [
        { regex: /^.{4,16}$/, message: 'La contraseña debe tener entre 4 y 16 caracteres.' },
        { regex: /[!@#$%^&*(),.?":{}|<>]/, message: 'La contraseña debe contener al menos un carácter especial.' },
        { regex: /[a-z]/, message: 'La contraseña debe contener al menos una letra minúscula.' },
        { regex: /[A-Z]/, message: 'La contraseña debe contener al menos una letra mayúscula.' },
        { regex: /[0-9]/, message: 'La contraseña debe contener al menos un número.' },
        { regex: /^\S*$/, message: 'La contraseña no debe contener espacios en blanco.' }
    ];

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        const user: User = {
            email: data.email,
            password: data.password
        };
        signin(user);
    });

    const isFormValid = Object.keys(errors).length === 0;

    return (
        <div className="bg-img w-full h-screen bg-center bg-cover bg-backgrodund-img flex justify-center items-center p-32">
            <div className="bg-white flex flex-col rounded-md p-16 items-center justify-center min-w-[400px]">
                <img width={128} height={128} src="/pato.webp" />
                <h2 className="text-4xl text-primary text-center my-2">Login</h2>
                {authErrors && (
                    <p className="mt-2 text-sm text-error-color dark:text-error-color">
                        {authErrors}
                    </p>
                )}
                <FormProvider {...methods}>
                    <form onSubmit={onSubmit} className="w-full flex flex-col items-center">
                        <Input
                            id="email"
                            type="email"
                            placeholder="email@patito.com"
                            etiqueta="Correo:"
                            validations={emailValidators}
                        />
                        <Input
                            id="password"
                            type="password"
                            placeholder="Contraseña"
                            etiqueta="Contraseña:"
                            validations={passwordValidators}
                        />
                        <Button
                            id="login-btn"
                            isDisabled={!isFormValid}
                            handleClick={onSubmit}
                        >
                            Iniciar Sesión
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}
