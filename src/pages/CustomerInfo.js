import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { baseUrl } from "../shared";
export default function CustomerInfo(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState();
    useEffect(()=>{
        const url = baseUrl + "api/customers/" + id;
        fetch(url)
        .then((response)=>{
            if(response.status ===404){
                //redirect to a 404 page
                navigate('/404')

            }

            return response.json();}
        )
        .then((data)=>{
            setCustomer(data.customer);
            console.log(customer);
        });



    },[]);

    return(
        <>

        
        {/*useEffect(() => {
          <p>{customer.industry}</p>
        }, [customer])
        The code you have replaced is not the correct way to use the useEffect hook. 
        The useEffect hook is used for running side effects, such as fetching data or logging, and not for rendering JSX elements directly.
        Instead, you should keep the JSX inside the return statement and use conditional 
        rendering to show the content only when the customer state is available.
        */
        customer ? <div>
                        <p>{customer.id}</p>
                        <p>{customer.name}</p>
                        <p>{customer.industry}</p>

                    </div> : null
        }

        <Link to = "/cus">Go Back</Link>

  
      
        </>
    )
}