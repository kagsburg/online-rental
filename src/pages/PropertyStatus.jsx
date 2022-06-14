import React, { useState, useEffect } from 'react'
import AuthorizePostRequest from '../api/authorizePostRequest';
import AuthorizeGetRequest from "../api/authorizeGetRequest";
import AuthorizeDeleteRequest from '../api/authorizedDeleteRequest';
import AuthorizePatchRequest from '../api/authorizedPatchRequest';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
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
const PropertyStatus = () => {
    const [sortModel, setSortModel] = useState([
        {
            field: 'id',
            sort: 'desc',
        },
    ]);
    const [selectionModel, setSelectionModel] = useState([]);
    const [statuserr, setstatuserr] = useState(false)
    const [descerr, setdescerr] = useState(false)
    const [AllStatus, setAllStatus] = useState([])
    const [deleteBtn, setdelete] = useState(false)

    const [description, setdescription] = useState('')
    const [status, setStatus] = useState('')
    const [loading, setloading] = useState(false)
    const [loading2, setloading2] = useState(true)
    const onChangeStatus = (e) => {
        setStatus(e.target.value);
        setstatuserr(false)
    }
    const onChangeDescrpition = (e) => {
        setdescription(e.target.value);
        setdescerr(false)
    }
    const onSubmitPropertyStatus = () => {

        if (status === '') {
            setstatuserr(true)
            return;
        }
        if (description === '') {
            setdescerr(true)
            return;
        }

        setloading(true)
        setstatuserr(false)
        setdescerr(false)
        AuthorizePostRequest('api/status', {
            status_name: status,
            description,
        })
            .then((response) => {
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
                    setStatus('');
                    setdescription('');
                    AuthorizeGetRequest('api/status').then((response) => {
                        if (response.status === 200) {
                            console.log(response.data);

                            setAllStatus(response.data.data)

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
                AuthorizePatchRequest(`api/status/${params.id}`, {
                    [params.field]: params.value
                })
                    .then((response) => {
                        if (response.status === 200) {
                            toast.success('Successfully Edited Property Status ', {
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
                            setAllStatus((prev) => [...prev]);
                        }
                    })
                const newRole = await mutateRow({
                    id: params.id,
                    [params.field]: params.value,
                });
                setAllStatus((prev) =>
                    prev.map((row) => (row.id === params.id ? { ...row, ...newRole } : row)),
                );

            } catch (error) {
                // setSnackbar({ children: 'Error while saving user', severity: 'error' });
                // Restore the row in case of error

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
            AuthorizeDeleteRequest(`api/status/${selectionModel[0]}`)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success('Successfully Deleted Property Status', {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        AuthorizeGetRequest('api/status').then((response) => {
                            if (response.status === 200) {
                                console.log(response.data);
                                setdelete(false)
                                setAllStatus(response.data.data)
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
                    toast.success('Successfully Deleted Property Status', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    AuthorizeGetRequest('api/status').then((response) => {
                        if (response.status === 200) {
                            console.log(response.data);
                            setdelete(false)
                            setAllStatus(response.data.data)
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
        { field: 'id', headerName: 'Type Id', width: 170, editable: true },
        { field: 'status_name', headerName: 'Property Status Name', width: 170, editable: true },

        { field: 'description', headerName: 'Status Description', width: 400, editable: true },
    ];
    useEffect(() => {
        AuthorizeGetRequest('api/status').then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                setAllStatus(response.data.data)
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
            {!loading && (<>
                <h1>Property Status</h1>
                <Card lg={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Add New Property Statuses
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
                            <TextField id="standard-basic" helperText={statuserr ? 'This field is required.' : ''} error={statuserr ? true : false} label="Property Status Name" value={status} onChange={onChangeStatus} variant="standard" required />
                            <TextField id="standard-basic2" helperText={descerr ? 'This field is required.' : ''} error={descerr ? true : false} label="Status Description" value={description} onChange={onChangeDescrpition}  variant="standard" />
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
                                onSubmitPropertyStatus();
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
                {/* <CardActions /> */}
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
                    rows={AllStatus}
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
            </>)}
            

        </div>
    )
}

export default PropertyStatus