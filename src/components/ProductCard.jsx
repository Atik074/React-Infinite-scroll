import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle} from "keep-react";

const ProductCard = ({product}) => {
    const {title,description ,thumbnail} = product
    
    return (
        <Card>
        <CardHeader>
          <img src={thumbnail}  className="rounded-t-xl" alt="image" width={600} height={300} />
        </CardHeader>
        <CardContent className="space-y-3">
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-[16.5px] my-4">
            {description}
          </CardDescription>
          <Button className="w-28 h-12 text-xl">Buy Now</Button>
        </CardContent>
      </Card>
    );
};

export default ProductCard;