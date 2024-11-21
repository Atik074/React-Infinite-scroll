import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { Spinner } from "keep-react";




const productPerPage =12



const ProductList = () => {
    const [products , setProducts] = useState([])
    const [page,setPage] =useState(0)
    const [hasMore, setHasMore] = useState(true)
    const loaderRef = useRef(null)


     useEffect(()=>{

        // to fetch data
    const fetchProducts =async()=>{
        const res = await fetch(`https://dummyjson.com/products?limit=${productPerPage}&skip=${page*productPerPage}`)
        const data =await res.json()
    

        if(data.products.length === 0){
            setHasMore(false)
        }else{
            setProducts((prevProducts)=>[
                ...prevProducts ,
                ...data.products
            ])

            setPage((prevPage)=>prevPage + 1)
        }
      
    }

    // function for intersecttion methos
        const interSection =(item)=>{
            const loaderItem =item[0]

            if(loaderItem.isIntersecting && hasMore){
                fetchProducts()
            }


        }

    // js default observer
      const observer =  new IntersectionObserver(interSection)

      if(observer && loaderRef.current){
           observer.observe(loaderRef.current)
      }

      // clean up 
      return ()=>{
        if(observer) observer.disconnect()
      }

     },[])

    return (
        <div>
             <h2 className="text-3xl text-center text-amber-800">Our All Products</h2>

            <div className="grid grid-cols-3 mt-3 gap-2 space-y-2">
            {
                products.map((product)=><ProductCard 
                key={product.id}
                product={product}
                />)
             }
            </div>
              
            { hasMore && <div  className="my-2" ref={loaderRef}>
                <Spinner color="error" />
            </div>}
        </div>
    );
};

export default ProductList;