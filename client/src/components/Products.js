import React, { useEffect, useState } from 'react';
import { Card, Button, CardGroup } from 'react-bootstrap';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext,PriceContext } from '../Context/LoginContext';
export default function Products({ adproducts }) {   
    const{ProductDetail} =useContext(ProductContext)
    const {PriceFilter}=useContext(PriceContext)
    let navigate = useNavigate()
    // const path=process.env.REACT_APP_PUBLIC_FOLDER
    const [Productview, setProductview] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/api/pview").then((response) => {
            setProductview(response.data.data)
        })
    }, [])

    const Deletehandler = (id) => {
        axios.get(`http://localhost:5000/api/delete/${id}`)
            .then((response) => {
                console.log(response.data.data)
                navigate('/adminhome')
            })
    }
    
    
        const filterdata=(ProductDetail)=>{
        Productview.filter((searchVal)=>{
            searchVal.pname.includes(ProductDetail)
        })
        
    }
    {filterdata&&
    console.log(filterdata)
}
Productview.filter((p)=>{
    p.price.includes(PriceFilter)
})
    const UserProducts = () => {
        return (            
            <>
            {Productview.map((value,key)=>{
                return(
                    
                    <Card style={{ width: "14em", display: "inline-flex", justifyContent: "space-around"}} className='mt-2 mb-2 ms-5' key={key}>
                            <Card.Img variant="top" src={`/upload/${value.image}`}/>
                            <Card.Body>
                                <Card.Title>{value.pname}</Card.Title>
                                <Card.Text>
                                    Rs.{value.price}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Link to=''><Button variant="primary" className='btn-sm'>Buy<PaidOutlinedIcon/></Button></Link>

                                <Button variant="primary" className='ms-5 btn-sm'>Cart<ShoppingCartOutlinedIcon/></Button>
                            </Card.Footer>
                        </Card>
                        
                )
            })}
            </>
        )
    }
    const AdminProducts = () => {

        return (
            <>
                {Productview.map((value, key) => {

                    return (
                        // <div className=' mt-2 w-25'  >
                        
                        <Card style={{ width: "14em", display: "inline-flex", justifyContent: "space-around" }} className='mt-2 mb-2 ms-5' key={key}>
                            <Card.Img variant="top" src={`/upload/${value.image}`} />
                            <Card.Body>
                                <Card.Title>{value.pname}</Card.Title>
                                <Card.Text>
                                    Rs.{value.price}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Link to={`/edit/${value._id}`}><Button variant="primary" className='btn-sm'>Edit <ModeEditOutlineOutlinedIcon /></Button></Link>

                                <Button variant="primary" className='ms-4 btn-sm' onClick={() => Deletehandler(value._id)}>Delete<DeleteOutlineOutlinedIcon /></Button>
                            </Card.Footer>
                        </Card>

                        // </div>
                    )
                })}

            </>
        )
    }
    return (
        <div>
            {adproducts ? <AdminProducts /> : <UserProducts />}
        </div>
    )

}
