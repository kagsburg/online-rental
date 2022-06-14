import React, { useState, useEffect } from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import AuthorizePostRequest from '../api/authorizePostRequest';
import AuthorizeGetRequest from "../api/authorizeGetRequest";
import AuthorizeDeleteRequest from '../api/authorizedDeleteRequest';
import AuthorizePatchRequest from '../api/authorizedPatchRequest';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
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
function Users() {
  const [sortModel, setSortModel] = useState([
    {
      field: 'id',
      sort: 'desc',
    },
  ]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [uId, setuId] = useState()
  const [AllCategories, setAllCategories] = useState([])
  const [AllRoles, setAllRoles] = useState([])
  const [deleteBtn, setdelete] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [roles, setRole] = React.useState('');
  const [loading, setloading] = useState(true)

  //open pop up modal
  const handleOpen = () => setOpen(true) ;
  const handleClose = () => setOpen(false);
  const mutateRow = useFakeMutation();

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

 
  const onSubmitRoleUpdate = () => {
    AuthorizePostRequest(`api/user_role/${uId}`,{
      role_id: roles
    })
    .then((res) => {
      console.log('res', res)
      if(res.data.status === 'success'){
        AuthorizeGetRequest('api/user').then((response) => {
          if (response.data.status === 'success') {
            setAllCategories(response.data.data)            
          }    
        })
        .catch(err=>{
          console.log('err',err)
        });
      toast.success('Role Updated Successfully')
      setOpen(false)
      }
      

    })
    .catch(error => {
      console.log('error', error)
    })
  }

  //handling the cell editing
  const handleCellEditCommit = React.useCallback(
    async (params) => {
      try {
        // Make the HTTP request to save in the backend
        AuthorizePatchRequest(`api/types/${params.id}`, {
          [params.field]: params.value
        })
          .then((response) => {
            if (response.status === 200) {
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
  //handling  single deletion of a row and multiple deletion of rows
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
      AuthorizeDeleteRequest(`api/types/${selectionModel[0]}`)
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
  const columns = [
    { field: 'id', headerName: 'Type Id', width: 170, editable: true },
    { field: 'Full_name', headerName: 'Full Name', width: 170, editable: true },
    { field: 'Email', headerName: 'Email Address', width: 180, editable: true },
    { field: 'Id Number', headerName: 'NIN', width: 170, editable: true },
    { field: 'role_id', headerName: 'Role Name', width: 180, editable: false },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          // onClick={`deleteUser(params.id)`}
        />,
        <GridActionsCellItem
          icon={<SecurityIcon />}
          label="Toggle Role"
          onClick={()=>{handleOpen()
             setuId(params.id) }}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<FileCopyIcon />}
          label="Duplicate User"
          // onClick={`duplicateUser(params.id)`}
          showInMenu
        />,
      ],
    },
  ];

  useEffect(() => {
    AuthorizeGetRequest('api/user').then((response) => {
      if (response.data.status === 'success') {
        console.log(response.data);
        setAllCategories(response.data.data)
        
      }

    })
    .catch(err=>{
      console.log('err',err)
    });
    AuthorizeGetRequest('api/roles').then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        setAllRoles(response.data.data)
        setloading(false)
      }

    }).catch(err=>{
      console.log('err',err)
    });

  }, []);
  if(loading){
    return (
        <Box display="flex" m='auto'marginTop={30}
        width={500} height={80}>
        <CircularProgress />
      </Box>
    )
}
  return (
    <div>
      <div style={{ marginTop: '30px' }}>
        {deleteBtn && (<>
          <Button variant="outlined" onClick={onDelete} startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </>)}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Adjust User Role
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>

          </Typography>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Roles</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={roles}
              onChange={handleChangeRole}
              autoWidth
              label="Age"
            >
              {AllRoles.map((element, i) => {
                return (
                  <MenuItem key={i} value={element.id}>{element.role_name}</MenuItem>
                )
              })}
            </Select>
           
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Button variant="contained" color="success" onClick={() => {
                onSubmitRoleUpdate();
              }} endIcon={<SaveIcon />}>
                Save
              </Button>
            </Typography>

          </FormControl>
        </Box>
      </Modal>
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

export default Users
