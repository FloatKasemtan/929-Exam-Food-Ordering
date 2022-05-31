import { Avatar, Card, CardHeader, CardMedia, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const DishCard = ({ image, name, price, children }) => {
  return (
    <Card>
      <CardHeader title={name} subheader={`${price} Baht`} />
      <CardMedia component="img" height={200} image={image} alt={name} />
      {children}
    </Card>
  );
};

export default DishCard;
