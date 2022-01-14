import React, { useState,useEffect } from 'react'
import AuthorizePostRequest from '../api/authorizePostRequest';
import AuthorizeGetRequest from "../api/authorizeGetRequest";
import AuthorizeDeleteRequest from '../api/authorizedDeleteRequest';
import AuthorizePatchRequest from '../api/authorizedPatchRequest';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
const useFakeMutation = () => {
    return React.useCallback(
      (user) =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve(user);
          }, 200),
        ),
      [],
    );
  };
export default function PropertyTypes() {
    const [sortModel, setSortModel] = useState([
        {
          field: 'id',
          sort: 'desc',
        },
      ]);
    const [selectionModel, setSelectionModel] = useState([]);
    const [categoryerr, setcategoryerr] = useState(false)
    const [descerr, setdescerr] = useState(false)
    const [AllCategories, setAllCategories] = useState([])
    const [deleteBtn, setdelete] = useState(false)

    const [description, setdescription] = useState('')
    const [category, setCategory] = useState('')
    const [loading, setloading] = useState(false)
    const onChangeCategory = (e)=>{
        setCategory(e.target.value);
    }
    const onChangeDescrpition = (e)=>{
        setdescription(e.target.value);
    }
    const onSubmitCategory = ()=>{
        
        if( category === ''){
            setcategoryerr(true)
            return;
        }
         if( description === ''){
            setdescerr(true)
            return;
        }
        
            setloading(true)
            setcategoryerr(false)
            setdescerr(false)
            AuthorizePostRequest('api/types', {
                category_name: category,
                description ,
              })
              .then((response) => {
                if (response.status === 201){
                    toast.success('Successfully Added New Property Type', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setloading(false)
                    setCategory('');
                    setdescription('');
                    AuthorizeGetRequest('api/types').then((response)=>{
                        if(response.status === 200){
                            console.log(response.data);
                           
                            setAllCategories(response.data.data)
                            
                        }
                        
                    });
                  } else {
                    toast.error("Oops Contact Admin", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                  }
              })
              .catch((error)=>{
                  console.log(error.message)
                  console.log(error.errors)
              })
      

    }
    const mutateRow = useFakeMutation();
    const handleCellEditCommit = React.useCallback(
        async (params) => {
          try {
            // Make the HTTP request to save in the backend
            AuthorizePatchRequest(`api/types/${params.id}`, {
              [params.field]:params.value    })
            .then((response) => {
              if (response.status === 200){
                  toast.success('Successfully Edited Property Type ', {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                  });             
                  } else {
                  toast.error("Oops Contact Admin", {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                  });
                  setAllCategories((prev) => [...prev]);
                }
            })
            const newRole = await mutateRow({
              id: params.id,
              [params.field]: params.value,
            });
            setAllCategories((prev) =>
              prev.map((row) => (row.id === params.id ? { ...row, ...newRole } : row)),
            );
            
          } catch (error) {
            // setSnackbar({ children: 'Error while saving user', severity: 'error' });
            // Restore the row in case of error
            
          }
        },
        [mutateRow],
      );
      const onDelete = () =>{
        if (selectionModel.length === 0){
          toast.info('Please Select any Role ', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return;
        }
        if (selectionModel.length === 1){
          AuthorizeDeleteRequest(`api/types/${selectionModel[0]}`)
          .then((response) => {
            if (response.status === 200){
                toast.success('Successfully Deleted Property Types', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                AuthorizeGetRequest('api/types').then((response)=>{
                    if(response.status === 200){
                        console.log(response.data);
                        setdelete(false)
                        setAllCategories(response.data.data)
                        return;
                    }
                    
                });
              } else {
                toast.error("Oops Contact Admin", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
              }
          })
          .catch((error)=>{
              console.log(error)
          })
          return;
        }
        const id = selectionModel.join(',');
          console.log(id);
          AuthorizeDeleteRequest(`api/Alltypes/${id}`)
          .then((response) => {
            if (response.status === 200){
                toast.success('Successfully Deleted Property Types', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                AuthorizeGetRequest('api/types').then((response)=>{
                    if(response.status === 200){
                        console.log(response.data);
                        setdelete(false)
                        setAllCategories(response.data.data)
                        return;
                    }
                    
                });
              } else {
                toast.error("Oops Contact Admin", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
              }
          })
          
  
      }
    const columns = [
        { field: 'id', headerName: 'Type Id', width: 170,editable: true },
        { field: 'category_name', headerName: 'Category Name', width: 170,editable: true },
       
        { field: 'description', headerName: 'Category Description', width: 400,editable: true },
      ];
      useEffect(() => {
        AuthorizeGetRequest('api/types').then((response)=>{
            if(response.status === 200){
                console.log(response.data);
                setAllCategories(response.data.data)
                // response.data.data.forEach((element) => {
                //     const title = {
                //       id: element.id,
                //       RoleName: element.role_name,
                //       Description: element.Description,
                //     };
                //     RolesTitles.push(title);
                //   });
            }
            
        });
       
    }, []);
    return (
        <div>
            <Card lg={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Add New Property Types
                    </Typography>
                    <form>
                        <Typography variant="h5" component="div">
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="standard-basic" helperText={categoryerr ? 'This field is required.' : ''} error={categoryerr ? '1' : ''} label="Category Name" value={category} onChange={onChangeCategory} variant="standard" />
                                <TextField id="standard-basic" helperText={descerr ? 'This field is required.' : ''} error={descerr ? '1' : ''} label="Category Description" value={description} onChange={onChangeDescrpition} variant="standard" />
                                {loading ? (
                                    <LoadingButton
                                        loading
                                        loadingPosition="start"
                                        startIcon={<SaveIcon />}
                                        variant="outlined"
                                    >
                                        Save
                                    </LoadingButton>
                                ) : (<> <Button variant="contained" color="success" onClick={() => {
                                    onSubmitCategory();
                                }} endIcon={<SaveIcon />}>
                                    Save
                                </Button></>)}
                            </Box>
                        </Typography>
                    </form>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary" />
                    <Typography variant="body2">
                        <br />
                    </Typography>
                </CardContent>
                <CardActions />
            </Card>
            <div style={{ marginTop: '30px' }}>
                {deleteBtn && (<>
                    <Button variant="outlined" onClick={onDelete} startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                </>)}
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={AllCategories}
                    columns={columns}
                    sortModel={sortModel}
                    onSortModelChange={(model) => setSortModel(model)}
                    onCellEditCommit={handleCellEditCommit}
                    checkboxSelection
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                        setdelete(true)
                        console.log(newSelectionModel);
                    }}
                    selectionModel={selectionModel}

                />
            </div>
        </div>
    )
}
