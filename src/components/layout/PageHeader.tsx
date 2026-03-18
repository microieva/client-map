import { useNavigate } from "react-router-dom";
import {Box, Chip, Typography } from "@mui/material";
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import { useApp } from "../../context/AppContext";

const PageHeader = (
  {countryName, numberOfArticles}:
  {countryName?:string, numberOfArticles?:number}
) => {
  const navigate = useNavigate();
  const {clearSelectedTopic} = useApp();

  return (
    <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", width:"100%", backgroundColor:"#242424",  paddingInline:"1rem", paddingBlock:"0.5rem"}}>
      <Chip size="small" label="← Map" title="map" onClick={() => {clearSelectedTopic(); navigate('/')}} sx={{backgroundColor:"darkgrey", "&:hover":{backgroundColor:"#fff", color:"gray"}}}/>

        <Typography variant="h2">
          <Chip 
            icon={<DescriptionTwoToneIcon color="inherit"/>} 
            size="small" 
            variant="outlined" 
            label={numberOfArticles}
            sx={{color:"inherit", paddingInline:"5px", marginRight:"1rem", fontWeight:"bold"}}
          />
          {countryName}
        </Typography>
    </Box> 
  )
}

export default PageHeader;