import { useEffect,useState } from "react"
import { Link } from "react-router-dom";
import { baseUrl } from "../shared";

export default function Customers(){
    const [customers, setCustomers] = useState();
    useEffect(()=>{
        fetch(baseUrl + "api/customers/")
        .then((response)=>
            response.json()
        )
        .then((data)=>{
            setCustomers(data.customers);

        });
    },[]);
    return (
        <>
            <h1>Here are our Customers</h1>
            {
                customers ? customers.map((customer)=>{
                    return (
                        <p>
                            <Link to = {"/cus/" + customer.id}>
                                {customer.name}
                            </Link>
                        </p>
                    )
                    
                }) : null
            }
        </>
    )
}