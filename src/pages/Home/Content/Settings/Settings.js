import React, { useState } from 'react';
import EditBox from './Boxes/EditBox';
import SettingsBox from './Boxes/SettingsBox';
import Typography from '@material-ui/core/Typography';

function Settings(){

    const [ settingState, setSettingState ] = useState({
        showEditBox: false
    });

    const handleEdit = () => {
        const toggle = !settingState.showEditBox;
        setSettingState({showEditBox: toggle});
    }

    const box = settingState.showEditBox ? <EditBox toggle={handleEdit}/> : <SettingsBox toggle={handleEdit}/>
    return (
        <div>
            <Typography variant="h6" align="center" paragraph> Your Account </Typography>
            {box}
        </div>
    )
}

export default Settings;