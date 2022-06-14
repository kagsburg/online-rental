import React, { useState, useEffect } from 'react'
import AuthorizePostRequest from '../api/authorizePostRequest';
import AuthorizeGetRequest from "../api/authorizeGetRequest";
import AuthorizeDeleteRequest from '../api/authorizedDeleteRequest';
import AuthorizePatchRequest from '../api/authorizedPatchRequest';
import SaveIcon from '@mui/icons-material/Save';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
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
import CircularProgress from '@mui/material/CircularProgress'
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
export default function PropertyUnits() {
    const [sortModel, setSortModel] = useState([
        {
            field: 'id',
            sort: 'desc',
        },
    ]);
    const [FormData, setFormData] = useState({
        Unit_title:'',  
        Rent: '',
        property_id: '',
        Initial_deposit: '',
        status:''
      });
      
      const onChange = (e) => {
        setFormData({...FormData,[e.target.name]: e.target.value})
        setcategoryerr(false)
      }
       //desturcture the inputs from state
  const {Unit_title,Rent,property_id,Initial_deposit,status} = FormData
    const [selectionModel, setSelectionModel] = useState([]);
    const [categoryerr, setcategoryerr] = useState(false)
    const [descerr, setdescerr] = useState(false)
    const [descerr2, setdescerr2] = useState(false)
    const [descerr3, setdescerr3] = useState(false)
    const [AllCategories, setAllCategories] = useState([])
    const [AllStatus, setAllStatus] = useState([])
    const [AllProperties, setAllProperties] = useState([])
    const [deleteBtn, setdelete] = useState(false)

    const [description, setdescription] = useState('')
    const [category, setCategory] = useState('')
    const [loading, setloading] = useState(false)
    const [loading2, setloading2] = useState(true)
    const onSubmitCategory = () => {

        if (FormData.Unit_title === '') {
            console.log(FormData)
            setcategoryerr(true)
            return;
        }
        if (FormData.property_id === '') {
            setdescerr2(true)
            return;
        } 
        if (FormData.initial_deposit === '') {
            setdescerr3(true)
            return;
        }
        if (FormData.Rent === '') {
            setdescerr(true)
            return;
        }
        setloading(true)
        console.log('FormData', FormData)
        AuthorizePostRequest('api/propertyunit', FormData).then((response) => {
                if (response.status === 201) {
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
                    AuthorizeGetRequest('api/propertyunit').then((response) => {
                        if (response.status === 200) {
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
            .catch((error) => {
                console.log(error.message)
                console.log(error.errors)
            })


    }
    const mutateRow = useFakeMutation();
    const handleCellEditCommit = React.useCallback(
        async (params) => {
            try {
                // Make the HTTP request to save in the backend
                AuthorizePatchRequest(`api/propertyunit/${params.id}`, {
                    [params.field]: params.value
                })
                    .then((response) => {
                        console.log(response)
                        if (response.data.status === 'success') {
                            toast.success('Successfully Edited Property Unit ', {
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
                console.log(error);
            }
        },
        [mutateRow],
    );
    const onDelete = () => {
        if (selectionModel.length === 0) {
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
        if (selectionModel.length === 1) {
            AuthorizeDeleteRequest(`api/propertyunit/${selectionModel[0]}`)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success('Successfully Deleted Property Unit', {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        AuthorizeGetRequest('api/propertyunit').then((response) => {
                            if (response.status === 200) {
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
                .catch((error) => {
                    console.log(error)
                })
            return;
        }
        const id = selectionModel.join(',');
        console.log(id);
        AuthorizeDeleteRequest(`api/Alltypes/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    toast.success('Successfully Deleted Property Types', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    AuthorizeGetRequest('api/types').then((response) => {
                        if (response.status === 200) {
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
    //handle if cell is checked 
    const handleCellChange = (value)=>{
            if (value.length === 0){
                setdelete(false)
                setSelectionModel(value);
            }else{
                setdelete(true)
                setSelectionModel(value);
            }
    }
    const columns = [
        { field: 'id', headerName: 'Type Id', width: 170, editable: true },
        { field: 'Unit_title', headerName: 'Unit Title', width: 170, editable: true },
        { field: 'Rent', headerName: 'Rent Amount', width: 150, editable: true },
        { field: 'Initial_deposit', headerName: 'Initial Deposit', width: 150, editable: true },
        { field: 'propertyName', headerName: 'Property Name', width: 200, editable: false },
        { field: 'description', headerName: 'Category Description', width: 100, editable: true },
    ];
    
    useEffect(() => {
        AuthorizeGetRequest('api/status').then((response) => {
            if (response.status === 200) {
                setAllStatus(response.data.data)
            }

        }).catch((err)=>{
            console.log(err)
        });
        AuthorizeGetRequest('api/propertyunit').then((response)=>{
            if(response.status ===200){
                setAllCategories(response.data.data)
            }
        }).catch((err)=>{
            console.log(err)
        })
        AuthorizeGetRequest('api/landlordproperty').then((response)=>{
            if(response.status === 200){
                setAllProperties(response.data.data)
                setloading2(false)
            }
        }).catch((err)=>{
            console.log(err)
        })

    }, []);
    if(loading2){
        return (
            <Box display="flex" m='auto'marginTop={30}
            width={500} height={80}>
            <CircularProgress />
          </Box>
        )
    }
    return (
        <div>
             <h1>Property Units</h1>
            <Card lg={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Add New Property Types
                    </Typography>

                    <Typography variant="h5" component="div">
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" helperText={categoryerr ? 'This field is required.' : ''} error={categoryerr ? true : false} label="Unit Name" name='Unit_title' value={Unit_title} onChange={onChange} variant="standard" />
                            <TextField inputProps={{inputMode: 'numeric',pattern: '[0-9]*'}} id="standard-basic" helperText={descerr ? 'This field is required.' : ''} error={descerr ? true : false} label="Expected Rental Amount" name="Rent" value={Rent} onChange={onChange} variant="standard" />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-autowidth-label2" variant="standard"  >Property Type</InputLabel>
                                <Select
                                    variant="standard"
                                    labelId="demo-simple-select-autowidth-label2"
                                    id="demo-simple-select"
                                    name="property_id"
                                    value={property_id}
                                    onChange={onChange}
                                    label="Property Type"
                                >
                                    {AllProperties.map((element, i) => {
                                        return (
                                            <MenuItem key={i} value={element.id}>{element.Property_name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-autowidth-label2" variant="standard"  >Property Type</InputLabel>
                                <Select
                                    variant="standard"
                                    labelId="demo-simple-select-autowidth-label2"
                                    id="demo-simple-select"
                                    name="status"
                                    value={status}
                                    onChange={onChange}
                                    label="Property Type"
                                >
                                    {AllStatus.map((element, i) => {
                                        return (
                                            <MenuItem key={i} value={element.id}>{element.status_name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <TextField id="standard-basic" helperText={descerr ? 'This field is required.' : ''} error={descerr ? true : false} label="Expected Initial Deposit Amount" name="Initial_deposit" value={Initial_deposit} onChange={onChange} variant="standard" />

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
                    disableSelectionOnClick 
                    onSelectionModelChange={(newSelectionModel) => {
                        handleCellChange(newSelectionModel);
                        console.log(newSelectionModel);
                    }}
                    selectionModel={selectionModel}

                />
            </div>
        </div>
    )
}
