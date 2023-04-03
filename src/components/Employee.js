function Employee(props){

    return (
        <>
        <h3>here is a Employee {props.name}</h3>
        <p>{props.role ? props.role: "No role"}</p>


    </>

    )



}

export default Employee; //allow us to easily use the emploee file inside other files