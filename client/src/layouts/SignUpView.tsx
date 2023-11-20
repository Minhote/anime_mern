import "../styles/Forms.css";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { useForm, SubmitHandler, ValidateResult } from "react-hook-form";
import { AuthenticatedResponse, SignUpInputs } from "../types";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import Cookie from "js-cookie";
import { Header, Main } from "../components";
import { URLDBAPI } from "../api/url";

export default function SignUpView() {
  const { setAuthIn } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm<SignUpInputs>();

  const onSubmit: SubmitHandler<SignUpInputs> = async (dataInputs) => {
    if (isValid) {
      const body: Omit<SignUpInputs, "passwordConfirm"> = {
        name: dataInputs.name,
        email: dataInputs.email,
        password: dataInputs.password,
      };
      try {
        const {
          data: { message, token, user },
        }: { data: AuthenticatedResponse } = await axios.post(
          `${URLDBAPI}/user/register`,
          body
        );

        Cookie.set(`userToken_${user._id}`, token);
        toast.success(`${message}`);
        reset();
        setAuthIn(user);
        navigate("/diario", { state: { ...user } });
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(`${error.response?.data.message}`);
        }
      }
    }
  };

  return (
    <>
      <Header />
      <Main>
        <div className="form__container">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="form__title">Sign Up</h1>
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              autoComplete="name"
              {...register("name", {
                minLength: {
                  value: 3,
                  message: "El nombre debe tener mínimo 3 caracteres",
                },
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              })}
            />
            {errors.name?.message && (
              <span className="form__error">{errors.name.message}</span>
            )}

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              {...register("email", {
                required: { value: true, message: "Este campo es requerido" },
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com)$/,
                  message:
                    "Solo son aceptados los dominios gmail.com, yahoo.com, hotmail.com u outlook.com",
                },
              })}
            />
            {errors.email?.message && (
              <span className="form__error">{errors.email.message}</span>
            )}

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: { value: true, message: "Este campo es requerido" },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                  message:
                    "La contraseña debe terner al menos una letra mayuscula, una letra minuscula, y un número",
                },
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener mínimo 6 caracteres",
                },
              })}
            />
            {errors.password?.message && (
              <span className="form__error">{errors.password.message}</span>
            )}

            <label htmlFor="passwordConfirm">Confirm your password:</label>
            <input
              type="password"
              id="passwordConfirm"
              {...register("passwordConfirm", {
                required: { value: true, message: "Este campo es requerido" },
                validate: (): ValidateResult => {
                  const passwordsValue = getValues([
                    "password",
                    "passwordConfirm",
                  ]);
                  if (passwordsValue[0] === passwordsValue[1]) {
                    return true;
                  }
                  return "No coincide con la contraseña establecida";
                },
              })}
            />
            {errors.passwordConfirm?.message && (
              <span className="form__error">
                {errors.passwordConfirm.message}
              </span>
            )}

            <button className="button__form" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </Main>
    </>
  );
}
