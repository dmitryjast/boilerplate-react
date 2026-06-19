import "./ErrorMessage.scss"

interface ErrorProps {
    message?: string;
}

export default function ErrorMessage({ message }: ErrorProps) {
    return(
        <>
            {message && (
                <div className="error-wrapper">
                    <p>{message}</p>
                </div>
            )}
        </>
    )
}