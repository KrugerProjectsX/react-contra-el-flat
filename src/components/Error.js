const Error = ({ children }) => {
    return(
        <div className="m-5 bg-red-800 text-white text-center p-3 mb-3 rounded-md">
            {children}
        </div>
    )
}

export {Error}