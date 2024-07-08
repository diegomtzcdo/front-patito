import { useFormContext, Controller } from "react-hook-form";

interface Validation {
    regex: RegExp;
    message: string;
}

interface InputProps {
    etiqueta?: string;
    id: string;
    type: string;
    placeholder: string;
    validations?: Validation[];
}

export default function Input({ id, etiqueta, type, placeholder, validations = [] }: InputProps) {
    const { control, formState: { errors } } = useFormContext();

    const validationRules = validations.length > 0
        ? {
            validate: (value: string) => {
                for (const validation of validations) {
                    if (!validation.regex.test(value)) {
                        return validation.message;
                    }
                }
                return true;
            }
        }
        : {};

    const error = errors[id]?.message as string;

    return (
        <div className="w-full my-2">
            {etiqueta && <label htmlFor={id} className={`block mb-2 text-sm font-medium ${error ? 'text-error-color' : 'text-black'}`}>{etiqueta}</label>}
            <Controller
                name={id}
                control={control}
                rules={validationRules}
                render={({ field }) => (
                    <input
                        {...field}
                        type={type}
                        id={id}
                        className={`mt-2.05 text-lg box-border w-full rounded-md bg-${error ? 'error-color' : 'gray'} border ${error ? 'border-error-color text-error-color placeholder-error-color focus:ring-error-color focus:border-error-color' : 'border-gray text-black placeholder-gray focus:ring-primary focus:border-primary'} text-sm rounded-lg block w-full p-2.5 `}
                        placeholder={placeholder}
                    />
                )}
            />
            {error && (
                <p className="mt-2 text-sm text-error-color dark:text-error-color">
                    {error}
                </p>
            )}
        </div>
    );
}
