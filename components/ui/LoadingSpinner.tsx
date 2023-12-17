
const LoadingSpinner = ({className}:{className?:string}) => {
  return (
    <div className="loading-spinner"><div className={`spinner-icon ${className}`}></div></div>
  )
}

export default LoadingSpinner
