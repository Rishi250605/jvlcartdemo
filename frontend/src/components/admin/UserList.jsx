import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../../actions/userActions";
import { clearError, clearUserDeleted } from "../../slices/userSlice";
import { toast } from 'react-toastify';
import { MDBDataTable } from 'mdbreact';
import Loader from '../layouts/Loader';
import Sidebar from "./Sidebar";
import { Pencil, Trash2, Users } from 'lucide-react';
import "./UserList.css";

export default function UserList() {
    const { users = [], loading = true, error, isUserDeleted } = useSelector(state => state.userState);
    const dispatch = useDispatch();

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc',
                    width: 250
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'disabled',
                    width: 150
                }
            ],
            rows: []
        };

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: <span className={`userList_roleBadge ${user.role}`}>{user.role}</span>,
                actions: (
                    <div className="userList_actionButtons">
                        <Link to={`/admin/user/${user._id}`} className="userList_editBtn" title="Edit User">
                            <Pencil size={16} />
                        </Link>
                        <button
                            onClick={e => deleteHandler(e, user._id)}
                            className="userList_deleteBtn"
                            title="Delete User"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                )
            });
        });

        return data;
    };

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteUser(id));
    };

    useEffect(() => {
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return;
        }
        if (isUserDeleted) {
            toast('User Deleted Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUserDeleted())
            });
            return;
        }

        dispatch(getUsers);
    }, [dispatch, error, isUserDeleted]);

    return (
        <div className="userList_mainWrapper">
            <div className="userList_sidebarContainer">
                <Sidebar />
            </div>
            <div className="userList_contentWrapper">
                <div className="userList_pageHeader">
                    <div className="userList_headerContent">
                        <Users size={24} className="userList_headerIcon" />
                        <h1>User Management</h1>
                    </div>
                    <p className="userList_userCount">
                        Total Users: <span>{users.length}</span>
                    </p>
                </div>

                <div className="userList_contentCard">
                    {loading ? (
                        <div className="userList_loaderContainer">
                            <Loader />
                        </div>
                    ) : (
                        <MDBDataTable
                            data={setUsers()}
                            bordered
                            striped
                            hover
                            className="userList_table"
                            noBottomColumns={true}
                            responsive
                            small
                            entries={10}
                            entriesOptions={[5, 10, 15, 20]}
                            pagesAmount={4}
                            searchLabel="Search users..."
                            info={false}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}