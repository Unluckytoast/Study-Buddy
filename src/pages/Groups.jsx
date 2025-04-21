import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Groups.css';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState('');
  const [editingGroup, setEditingGroup] = useState(null);
  const [groupName, setGroupName] = useState('');
  const navigate = useNavigate();

  // Fetch groups when the component mounts
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/groups');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups', error);
      }
    };
    fetchGroups();
  }, []);

  // Handle creating a new group
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/groups', { name: newGroup });
      setGroups((prevGroups) => [...prevGroups, response.data]);
      setNewGroup('');
    } catch (error) {
      console.error('Error creating group', error);
    }
  };

  // Handle editing a group
  const handleEditGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/groups/${editingGroup.id}`, { name: groupName });
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === editingGroup.id ? { ...group, name: response.data.name } : group
        )
      );
      setEditingGroup(null);
      setGroupName('');
    } catch (error) {
      console.error('Error editing group', error);
    }
  };

  // Handle selecting a group for editing
  const handleEditButtonClick = (group) => {
    setEditingGroup(group);
    setGroupName(group.name);
  };

  // Handle canceling the edit
  const handleCancelEdit = () => {
    setEditingGroup(null);
    setGroupName('');
  };

  return (
    <div className="groups-container">
      <h2>Groups</h2>

      {/* New Group Form */}
      <div className="create-group">
        <h3>Create New Group</h3>
        <form onSubmit={handleCreateGroup}>
          <input
            type="text"
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
            placeholder="Enter group name"
            required
          />
          <button type="submit">Create Group</button>
        </form>
      </div>

      {/* Edit Group Form */}
      {editingGroup && (
        <div className="edit-group">
          <h3>Edit Group</h3>
          <form onSubmit={handleEditGroup}>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter new group name"
              required
            />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Group List */}
      <div className="group-list">
        <h3>Your Groups</h3>
        {groups.length === 0 ? (
          <p>No groups found.</p>
        ) : (
          <ul>
            {groups.map((group) => (
              <li key={group.id} className="group-item">
                <span>{group.name}</span>
                <button onClick={() => handleEditButtonClick(group)}>Edit</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Groups;
