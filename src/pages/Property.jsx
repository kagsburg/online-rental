import React, { useState, useEffect } from 'react'
import AuthorizePostRequest from '../api/authorizePostRequest';
import AuthorizeGetRequest from "../api/authorizeGetRequest";
import AuthorizeDeleteRequest from '../api/authorizedDeleteRequest';
import AuthorizePatchRequest from '../api/authorizedPatchRequest';
import SaveIcon from '@mui/icons-material/Save';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
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
import NoRows from '../components/NoRows';
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
const Property = () => {
    const mutateRow = useFakeMutation();
    const [Propertylist, setPropertylist] = useState([])
    const [propertyname, setPropertyname] = useState('');
    const [propertynameerr, setPropertyerr] = useState(false);
    const [rentamt, setRentAmt] = useState('');
    const [location, setLocation] = useState('');
    const [locationerr, setLocationerr] = useState(false);
    const [rentamterr, setRentAmterr] = useState(false);
    const [loading, setloading] = useState(false)
    const [loading2, setloading2] = useState(true)
    const [Alllandlords, setAllLandords] = useState([])
    const [AllTypes, setAllTypes] = useState([])
    const [AllProperties, setAllProperties] = useState([])
    const [lords, setLord] = useState('');
    const [typeId, setTypeId] = useState('');
    const ClearInputs = (e) => {
        setPropertyname('')
        setRentAmt('')
        setLocation('')
        setLord('')
        setTypeId('')
    }
    const onChangeProperty = (e) => {
        setPropertyname(e.target.value);
        setPropertyerr(false)
    }
    const onChangeRentAmt = (e) => {
        setRentAmt(e.target.value);
        setRentAmterr(false)
    }
    const onChangeLocation = (e) => {
        setLocation(e.target.value);
        setLocationerr(false)
    }
    const handleChangeLord = (event) => {
        setLord(event.target.value);
    };
    const handleChangeType = (event) => {
        setTypeId(event.target.value);
    };
    const onSubmitProperty = (e) => {
        setloading(true)
        if (propertyname === '' || lords === '' || typeId === '') {
            setPropertyerr(true)
        }
        console.log(lords)
        console.log(typeId)
        AuthorizePostRequest('api/property', {
            Property_name: propertyname,
            Rent_amount: rentamt,
            Location: location,
            landlord_id: lords,
            Type_id: typeId
        })
            .then((response) => {
                if (response.status === 201) {
                    toast.success('Successfully Added New Property', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setloading(false)
                    ClearInputs()
                    AuthorizeGetRequest('api/landlordproperty').then((response) => {
                        if (response.status === 200) {
                            console.log(response.data);
                            setAllProperties(response.data.data)
                           
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
    function getPropertytype(params) {
        console.log('params',params.row.Type_id[0])
        // return `${params.row.Type_id[0].role_name || ''} `;
      }
      const handleCellEditCommit = React.useCallback(
        async (params) => {
          try {
            // Make the HTTP request to save in the backend
            AuthorizePatchRequest(`api/property/${params.id}`, {
              [params.field]:params.value    })
            .then((response) => {
              if (response.status === 200){
                  toast.success('Successfully Edited  ', {
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
                  setPropertylist((prev) => [...prev]);
                }
            })
            const newRole = await mutateRow({
              id: params.id,
              [params.field]: params.value,
            });
            setPropertylist((prev) =>
              prev.map((row) => (row.id === params.id ? { ...row, ...newRole } : row)),
            );
            
          } catch (error) {
            // setSnackbar({ children: 'Error while saving user', severity: 'error' });
            // Restore the row in case of error
            
          }
        },
        [mutateRow],
      );
    const columns = [
        { field: 'id', headerName: 'Property Id', width: 170, editable: true },
        { field: 'Property_name', headerName: 'Property Name', width: 170, editable: true },
        { field: 'Rent_amount', headerName: 'Property Rent Amount', width: 170, editable: true },
        { field: 'Location', headerName: 'Property Location', width: 170, editable: true },
        { field: 'Type_id', headerName: 'Property Type', width: 200, editable: false, },
        { field: 'status', headerName: 'Property Status', width: 200, editable: false, },
    ];
    useEffect(() => {
        AuthorizeGetRequest('api/types').then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                setAllTypes(response.data.data)

            }

        })
        .catch(err=>{
            console.log(err)
        })
        ;
        AuthorizeGetRequest('api/landlordproperty').then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                setAllProperties(response.data.data)
                setloading2(false)

            }

        });
        
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
             <h1>Properties</h1>
            <Card lg={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Add New Property
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
                            <TextField id="standard-basic" helperText={propertynameerr ? 'This field is required.' : ''} error={propertynameerr ? true : false} label="Property Name" value={propertyname} onChange={onChangeProperty} variant="standard" />
                            <TextField id="standard-basic" helperText={rentamterr ? 'This field is required.' : ''} error={rentamterr ? true : false} label="Rent Amount" value={rentamt} onChange={onChangeRentAmt} variant="standard" />
                            <TextField id="standard-basic" helperText={locationerr ? 'This field is required.' : ''} error={locationerr ? true : false} label="Property Location" value={location} onChange={onChangeLocation} variant="standard" />
                            
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-autowidth-label2" variant="standard"  >Property Type</InputLabel>
                                <Select
                                    variant="standard"
                                    labelId="demo-simple-select-autowidth-label2"
                                    id="demo-simple-select"
                                    value={typeId}
                                    onChange={handleChangeType}
                                    label="Property Type"
                                >
                                    {AllTypes.map((element, i) => {
                                        return (
                                            <MenuItem key={i} value={element.id}>{element.category}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>

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
                                onSubmitProperty();
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
                {/* {deleteBtn && (<>
                    <Button variant="outlined" onClick={onDelete} startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                </>)} */}
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                rows={AllProperties}
                columns={columns}
                components={{
                    NoRowsOverlay: NoRows,
                  }}
                // sortModel={sortModel}
                // onSortModelChange={(model) => setSortModel(model)}
                onCellEditCommit={handleCellEditCommit}
                // checkboxSelection
                // onSelectionModelChange={(newSelectionModel) => {
                //     setSelectionModel(newSelectionModel);
                //     setdelete(true)
                //     console.log(newSelectionModel);
                // }}
                // selectionModel={selectionModel}

                />
            </div>

        </div>
    )
}

export default Property