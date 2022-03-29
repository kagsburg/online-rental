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
const Property = () => {
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
                    AuthorizeGetRequest('api/property').then((response) => {
                        if (response.status === 200) {
                            console.log(response.data);
                            setAllProperties(response.data.data)
                            // setAllStatus(response.data.data)

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
    const columns = [
        { field: 'id', headerName: 'Property Id', width: 170, editable: true },
        { field: 'Property_name', headerName: 'Property Name', width: 170, editable: true },
        { field: 'Rent_amount', headerName: 'Property Rent Amount', width: 170, editable: true },
        { field: 'Location', headerName: 'Property Location', width: 170, editable: true },
        { field: 'Type_id', headerName: 'Property Type', width: 400, editable: false,valueGetter: getPropertytype },
    ];
    useEffect(() => {
        AuthorizeGetRequest('api/types').then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                setAllTypes(response.data.data)

            }

        });
        AuthorizeGetRequest('api/landlord').then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                setAllLandords(response.data.data)

            }

        });
        AuthorizeGetRequest('api/property').then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                setAllProperties(response.data.data)

            }

        });

    }, []);
    return (
        <div>
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
                                <InputLabel id="demo-simple-select-autowidth-label" variant="standard"  >Landlords</InputLabel>
                                <Select
                                    variant="standard"
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={lords}
                                    onChange={handleChangeLord}

                                    label="Landlords"
                                >
                                    {Alllandlords.map((element, i) => {
                                        return (
                                            <MenuItem key={i} value={element.id}>{element.Full_name}</MenuItem>
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
                                    value={typeId}
                                    onChange={handleChangeType}
                                    label="Property Type"
                                >
                                    {AllTypes.map((element, i) => {
                                        return (
                                            <MenuItem value={element.id}>{element.category_name}</MenuItem>
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
                // onCellEditCommit={handleCellEditCommit}
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