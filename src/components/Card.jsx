import  React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import CallIcon from '@mui/icons-material/Call';
import LanguageIcon from '@mui/icons-material/Language';
import Divider from '@mui/material/Divider';
import {red} from '@mui/material/colors'
import axios from 'axios';
import "./Card.css"


export default function CardComponent() { 

    const [data, setData] = useState([])
    const [openDialog, setOpenDialog] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [editIndex, setEditIndex] = useState(-1);

    function handleOpenForm(el) {
        setName(el.name)
        setEmail(el.email)
        setPhone(el.phone)
        setWebsite(el.website)
      setOpenDialog(true);
    }
    function handleCloseForm() {
      setOpenDialog(false);
    }

    function handleAddData(){
        var tempData = [...data];
      
                tempData[editIndex].name = name;
                tempData[editIndex].phone= phone;
                tempData[editIndex].email = email;
                tempData[editIndex].website = website;
            
        // console.log(editIndex)
        // console.log(tempData)
        setData(tempData)
        setOpenDialog(false)
    }
    
    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then((res)=> setData(res.data))
    },[])

    

    const deleteData = (id) =>{
    //    console.log(id)
       let newData = [...data].filter((e)=>{
           return e.id !== id
       })
       setData(newData)
    }

  return (
    <Card  variant="body2" color="text.secondary" className='cardItems'> 
          {
              data.map((el,i) =>{
                  return(
                      <div className='mapedItems' key={i}>                         
                      <div className='imageDiv'>
                          <img src="https://avatars.dicebear.com/v2/avataaars/%7B%7Busername%7D%7D.svg?options[mood][]=happy" alt="img" width="50%" />
                      </div>
                      <div className='contentDiv'>
                      <h4>{el.name}</h4>
                      <p><MailOutlineIcon/><span>{el.email}</span></p>
                      <p><CallIcon/><span>{el.phone}</span></p>
                      <p><LanguageIcon/><span>{el.website}</span></p>
                      </div>
                      <CardActions disableSpacing className="bottomIcons">
                      <Checkbox  icon={<FavoriteBorder sx = {{color: red[500]}} />} checkedIcon={<Favorite sx = {{color: red[500]}}/>} />
                        
                        <Divider orientation="vertical" flexItem />
                        <IconButton aria-label="edit">
                        <EditIcon onClick={()=>{
                            setEditIndex(i);
                            handleOpenForm(el)
                        }
                            }/>
                        <Dialog open={openDialog} onClose={handleCloseForm}>
                            <DialogTitle>Edit </DialogTitle>
                            <DialogContent>
                            <TextField
                                value={name}
                                onInput={(e) => {
                                setName(e.target.value);
                                }}
                                size="small"
                                autoFocus
                                margin="dense"
                                label={"Name *"}
                                type="text"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                value={email}
                                onInput={(e) => {
                                setEmail(e.target.value);
                                }}
                                size="small"
                                margin="dense"
                                label={"Email *"}
                                type="email"
                                fullWidth
                                variant="outlined"
                            />

                            <div className="start-end-date experience">
                                <TextField
                                value={phone}
                                onInput={(e) => {
                                    setPhone(e.target.value);
                                }}
                                size="small"
                                margin="dense"
                                label={"Phone *"}
                                type="text"
                                fullWidth
                                variant="outlined"
                                />

                                <TextField
                                value={website}
                                onInput={(e) => {
                                    setWebsite(e.target.value);
                                }}
                                size="small"
                                margin="dense"
                                label={"Website *"}
                                type="url"
                                fullWidth
                                variant="outlined"
                                />
                            </div>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleCloseForm}>Cancel</Button>
                            <Button onClick={() => {
                                handleAddData();
                            }}>Ok</Button>
                            </DialogActions>
                        </Dialog>
                        </IconButton>
                        <Divider orientation="vertical" flexItem />
                        <IconButton aria-label="delete">
                            <DeleteIcon onClick={()=> deleteData(el.id)}/>
                        </IconButton>                        
                    </CardActions>
            
                      </div>
                  )
              })
          }
       
     
     
      
    </Card>
  );
}