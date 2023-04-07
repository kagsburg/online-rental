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

const Leases = () => {
    //create state variable obj
    const [lease, setLease] = useState({
        type_id: "",
        unit_id: "",
        tenant_id: "",
        status: "",
        lease_start: "",
        lease_end: "",
        document: "",
        leaseRent: "",
        
    });
  const [loading, setloading] = useState(false)
  const [Alllandlords, setAllLandords] = useState([])
  const [AllTypes, setAllTypes] = useState([])
  const [AllProperties, setAllProperties] = useState([])
  const [AllUnits, setAllUnits] = useState([])
  const handleChangeType = (e) => {
    setLease((prev)=>({ ...prev, [e.target.name]: e.target.value }));      
  };
  //function to handle upload of document
    const handleUpload = (e) => {
        setLease((prev)=>({ ...prev, document: e.target.files[0] }));
    }
 
  const onSubmitProperty = (e) => {
    // e.preventDefault();
      setloading(true)
      //validate form data 
        if (lease.type_id === "" || lease.unit_id === "" || lease.tenant_id === "" || lease.lease_start === "" || lease.lease_end === ""  || lease.leaseRent === "") {
            toast.error("Please fill all fields");
            setloading(false)
            return;
        }
        const formData = new FormData();
        formData.append("type_id", lease.type_id);
        formData.append("unit_id", lease.unit_id);
        formData.append("tenant_id", lease.tenant_id);
        formData.append("status", lease.status);
        formData.append("lease_start", lease.lease_start);
        formData.append("lease_end", lease.lease_end);
        formData.append("document", lease.document);
        // formData.append("leaseRent", lease.leaseRent);
    console.log(Object.fromEntries(formData.entries()));
    //   AuthorizePostRequest('api/tenants', formData)
    //       .then((response) => {
    //           if (response.status === 201) {
    //               toast.success('Successfully Added New Property', {
    //                   position: "top-right",
    //                   autoClose: 5000,
    //                   hideProgressBar: false,
    //                   closeOnClick: true,
    //                   pauseOnHover: true,
    //                   draggable: true,
    //                   progress: undefined,
    //               });
    //               setloading(false)
                    
    //           } else {
    //               toast.error("Oops Contact Admin", {
    //                   position: "bottom-right",
    //                   autoClose: 5000,
    //                   hideProgressBar: false,
    //                   closeOnClick: true,
    //                   pauseOnHover: true,
    //                   draggable: true,
    //                   progress: undefined,
    //               });
    //           }
    //       })
    //       .catch((error) => {
    //           console.log(error.message)
    //           console.log(error.errors)
    //       })

  }
  //create useEffect that gets the properties and unit on load 
    useEffect(() => {
        AuthorizeGetRequest('api/property').then((response) => {
            if (response.status === 200) {
                // console.log(response.data);
                setAllProperties(response.data.data)
                
            }
        }).catch((error) => {
            console.log(error.message)
        });
        
        AuthorizeGetRequest('api/landlord').then((response) => {
            if (response.status === 200) {
                // console.log(response.data);
                setAllLandords(response.data.data)
            }
        }).catch((error) => {
            console.log(error.message)
        });
        AuthorizeGetRequest('api/tenants').then((response) => {
            if (response.status === 200) {
                // console.log(response.data);
                setAllTypes(response.data.data)
            }
        });
    }, []);

    useEffect(()=>{
        if (lease.type_id !== '') {
        AuthorizeGetRequest(`api/property_unit/${lease.type_id}`).then((response) => {
            if (response.status === 200) {
                // console.log(response.data);
                setAllUnits(response.data.data)
            }
        }).catch((error) => {
            console.log(error.message)
        });
    }
    },[lease.type_id])
    console.log(lease)
  return (
    <div>
        <h1>Leases</h1>
        <Card lg={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Add New Lease
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
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-autowidth-label2" variant="standard" sx={{ fontSize:'15px'}} >Select Property</InputLabel>
                                <Select
                                    variant="standard"
                                    name="type_id"
                                    labelId="demo-simple-select-autowidth-label2"
                                    id="demo-simple-select"
                                    value={lease.type_id}
                                    onChange={handleChangeType}
                                    label="Property Type"
                                >
                                    {AllProperties.map((element, i) => {
                                        return (
                                            <MenuItem key={i} value={element.id}>{element.Property_name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                                    {/*only show the unit if the selected Property type has units attached to it   */}
                                    {AllUnits.length > 0 && <>
                                        <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-autowidth-label2" variant="standard" sx={{ fontSize:'12px'}} >Select Property Units</InputLabel>
                                <Select
                                    variant="standard"
                                    name="unit_id"
                                    labelId="demo-simple-select-autowidth-label2"
                                    id="demo-simple-select"
                                    value={lease.unit_id}
                                    onChange={handleChangeType}
                                    label="Property Type Units"
                                >
                                    {AllUnits.map((element, i) => {
                                        return (
                                            <MenuItem key={i} value={element.id}>{element.Unit_title}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                                    </>}
                            <TextField id="standard-basic"  label="Rent Amount" value={lease.leaseRent}name="leaseRent" onChange={handleChangeType} variant="standard" />
                            
                            <TextField id="standard-basic" onChange={handleChangeType} name="lease_start" label="Start Date" type="date"  sx={{ width: 220 }}InputLabelProps={{shrink: true,}}/>
                            <TextField id="standard-basic" onChange={handleChangeType} name="lease_end" label="End Date" type="date"  sx={{ width: 220 }}InputLabelProps={{shrink: true,}}/>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-autowidth-label2" variant="standard"  >Tenants</InputLabel>
                                <Select
                                    variant="standard"
                                    labelId="demo-simple-select-autowidth-label2"
                                    id="demo-simple-select"
                                    name='tenant_id'
                                    value={lease.tenant_id}
                                    onChange={handleChangeType}
                                    label="Property Type"
                                >
                                    {AllTypes.map((element, i) => {
                                        return (
                                            <MenuItem key={i} value={element.TenantId}>{element.TenantName}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                                 <Button variant="contained" onChange ={handleUpload} component="label">
                                    Upload document
                                    <input hidden multiple type="file"  />
                                    </Button>
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
    </div>
  )
}

export default Leases