import "../styles/Forms.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthenticatedResponse, LogInInputs } from "../types";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import Cookie from "js-cookie";
import { Header, Main } from "../components";

export default function LogInView() {
  const { setAuthIn } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LogInInputs>();

  const onSubmit: SubmitHandler<LogInInputs> = async (dataInputs) => {
    if (isValid) {
      const body: LogInInputs = {
        name: dataInputs.name,
        password: dataInputs.password,
      };

      try {
        const {
          data: { message, user, token },
        }: { data: AuthenticatedResponse } = await axios.post(
          "http://localhost:3000/user/login",
          body
        );

        toast.success(`${message}`);
        Cookie.set(`userToken_${user._id}`, token);

        setAuthIn(user);
        navigate("/diario", { state: { ...user } });
        reset();
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message);
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
            <h1 className="form__title">Log In </h1>
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              })}
            />
            {errors.name?.message && (
              <span className="form__error">{errors.name.message}</span>
            )}

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: { value: true, message: "Este valor es requerido" },
              })}
            />
            {errors.name?.message && (
              <span className="form__error">{errors.name.message}</span>
            )}

            <button className="button__form" type="submit">
              Log In
            </button>
          </form>
        </div>
      </Main>
    </>
  );
}
