import DatePicker from '../../../components/LV1/DatePicker/DatePicker';
import TimePicker from '../../../components/LV1/TimePicker/TimePicker'; // Adjust the import path as needed
import TextBoxWithLabel from '../../../components/LV1/TextBox/TextBoxWithLabel';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Box, TextField, Typography } from '@mui/material';
import ButtonAtom from '../../../components/LV1/Button/ButtonAtom/ButtonAtom';
import MenuHeader from '../../../components/LV3/Header/MenuHeader';
import SelectOption from '../../../components/LV1/SelectOption/SelectOption';
import DataTable from '../../../components/LV3/DataTable/DataTable';

function CompaniesList() {
    // State for selected start and end times
    const [selectedStartTime, setSelectedStartTime] = useState<Dayjs | null>(dayjs());
    const [selectedEndTime, setSelectedEndTime] = useState<Dayjs | null>(dayjs());

    // State for selected start and end dates
    const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(null);
    const headers = ['No', '開始日時', '終了日時', '管理者Ｎｏ', '管理者名', '通訳言語', '評価'];
    const data = [
        { No: 1, 開始日時: '2024-11-01 09:00', 終了日時: '2024-11-01 10:00', 契約Ｎｏ: '1001', 企業名: 'Company A', 店舗名: 'Sales', 通訳者Ｎｏ: 7, 通訳言語: 'Japanese', 通訳者名: 'John', 評価: 5 },
        { No: 2, 開始日時: '2024-11-01 11:00', 終了日時: '2024-11-01 12:00', 契約Ｎｏ: '1002', 企業名: 'Company B', 店舗名: 'Marketing', 通訳者Ｎｏ: 8, 通訳言語: 'English', 通訳者名: 'Alice', 評価: 4 },
        { No: 3, 開始日時: '2024-11-01 13:00', 終了日時: '2024-11-01 14:00', 契約Ｎｏ: '1003', 企業名: 'Company C', 店舗名: 'Support', 通訳者Ｎｏ: 9, 通訳言語: 'Chinese', 通訳者名: 'Mike', 評価: 3 },
        { No: 4, 開始日時: '2024-11-01 15:00', 終了日時: '2024-11-01 16:00', 契約Ｎｏ: '1004', 企業名: 'Company D', 店舗名: 'IT', 通訳者Ｎｏ: 10, 通訳言語: 'Korean', 通訳者名: 'Sarah', 評価: 5 },
        { No: 5, 開始日時: '2024-11-01 17:00', 終了日時: '2024-11-01 18:00', 契約Ｎｏ: '1005', 企業名: 'Company E', 店舗名: 'Finance', 通訳者Ｎｏ: 11, 通訳言語: 'Japanese', 通訳者名: 'David', 評価: 4 },
        { No: 6, 開始日時: '2024-11-01 19:00', 終了日時: '2024-11-01 20:00', 契約Ｎｏ: '1006', 企業名: 'Company F', 店舗名: 'HR', 通訳者Ｎｏ: 12, 通訳言語: 'French', 通訳者名: 'Anna', 評価: 5 },
        { No: 7, 開始日時: '2024-11-02 09:00', 終了日時: '2024-11-02 10:00', 契約Ｎｏ: '1007', 企業名: 'Company G', 店舗名: 'Engineering', 通訳者Ｎｏ: 13, 通訳言語: 'German', 通訳者名: 'Tom', 評価: 3 },
        { No: 8, 開始日時: '2024-11-02 11:00', 終了日時: '2024-11-02 12:00', 契約Ｎｏ: '1008', 企業名: 'Company H', 店舗名: 'Legal', 通訳者Ｎｏ: 14, 通訳言語: 'Japanese', 通訳者名: 'Emma', 評価: 5 },
        { No: 9, 開始日時: '2024-11-02 13:00', 終了日時: '2024-11-02 14:00', 契約Ｎｏ: '1009', 企業名: 'Company I', 店舗名: 'Operations', 通訳者Ｎｏ: 15, 通訳言語: 'Spanish', 通訳者名: 'James', 評価: 4 },
        { No: 10, 開始日時: '2024-11-02 15:00', 終了日時: '2024-11-02 16:00', 契約Ｎｏ: '1010', 企業名: 'Company J', 店舗名: 'R&D', 通訳者Ｎｏ: 16, 通訳言語: 'English', 通訳者名: 'Sophia', 評価: 3 },
        { No: 11, 開始日時: '2024-11-02 17:00', 終了日時: '2024-11-02 18:00', 契約Ｎｏ: '1011', 企業名: 'Company K', 店舗名: 'Customer Service', 通訳者Ｎｏ: 17, 通訳言語: 'Japanese', 通訳者名: 'Liam', 評価: 5 },
        { No: 12, 開始日時: '2024-11-02 19:00', 終了日時: '2024-11-02 20:00', 契約Ｎｏ: '1012', 企業名: 'Company L', 店舗名: 'Logistics', 通訳者Ｎｏ: 18, 通訳言語: 'Italian', 通訳者名: 'Olivia', 評価: 4 }
    ];

    const columnWidths = [5, 20, 20, 8, 10, 10, 10, 10, 10, 10];
    const columnAlignments: ('left' | 'center' | 'right')[] = ['right'];

    const searchConditions = () => { };

    // Handle start date change
    const handleStartDateChange = (date: Dayjs | null) => {
        setSelectedStartDate(date);
        console.log("Selected Start Date:", date ? date.format('YYYY-MM-DD') : 'None'); // Log the selected start date
    };

    // Handle end date change
    const handleEndDateChange = (date: Dayjs | null) => {
        setSelectedEndDate(date);
        console.log("Selected End Date:", date ? date.format('YYYY-MM-DD') : 'None'); // Log the selected end date
    };

    // Handle start time change
    const handleStartTimeChange = (newValue: Dayjs | null) => {
        setSelectedStartTime(newValue);
        console.log("Selected Start Time:", newValue ? newValue.format('HH:mm:ss') : 'None'); // Log the selected start time
    };

    // Handle end time change
    const handleEndTimeChange = (newValue: Dayjs | null) => {
        setSelectedEndTime(newValue);
        console.log("Selected End Time:", newValue ? newValue.format('HH:mm:ss') : 'None'); // Log the selected end time
    };

    // Format the full datetime strings for display
    const formatFullDateTime = (date: Dayjs | null, time: Dayjs | null) => {
        if (!date || !time) return 'None';
        return `${date.format('YYYY-MM-DD')} ${time.format('HH:mm:ss')}`;
    };

    const [textValue1, setTextValue1] = useState<string>('');
    const [textValue2, setTextValue2] = useState<string>('');
    const [textValue3, setTextValue3] = useState<string>('');
    const [textValue4, setTextValue4] = useState<string>('');
    const [textValue5, setTextValue5] = useState<string>('');

    const handleSelectionChange = (selectedData: Array<{ No: string | number;[key: string]: string | number }>) => {
        console.log('Selected Data:', selectedData);
    };

    return (
        <div className="admin-menu-nav-page" >
            <MenuHeader title="管理者一覧" />

            <Box sx={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '0 16px',
                display: 'flex',
                flexDirection: 'column',
                margin: '1vh 1vw',

                // transform: 'scaleY(0.8)',
                // overflowY: 'auto',
            }}>
                <div className='select-range'>
                    <span >登録日時</span>

                    <span >開始日時：</span>
                    <DatePicker label="" onDateChange={handleStartDateChange} />
                    {/* <div>{formatFullDateTime(selectedStartDate, selectedStartTime)}</div> Display full start datetime */}
                    <TimePicker
                        label="Select Start Time"
                        value={selectedStartTime}
                        onChange={handleStartTimeChange} // Use the separate handler for start time
                    />

                    <span >~</span>

                    <span >終了日時：</span>
                    <DatePicker label="" onDateChange={handleEndDateChange} />
                    {/* <div>{formatFullDateTime(selectedEndDate, selectedEndTime)}</div> Display full end datetime */}
                    <TimePicker
                        label="Select End Time"
                        value={selectedEndTime}
                        onChange={handleEndTimeChange} // Use the separate handler for end time
                    />
                </div>
                <div className="administrator-search-container">
                    <div className="number-detail-column">


                        <TextBoxWithLabel
                            label="管理者No"
                            width="12vw" // Uncomment to set a custom width
                            value={textValue1}
                            onChange={(e: any) => setTextValue1(e.target.value)}
                        />
                    </div>
                    <div className="name-detail-column">

                        <div>
                            <div className='person-name-details' >
                                {/* <div>
                                    <div className='name-label' >フリガナ</div>
                                    <div>管理者名</div>
                                </div> */}
                                <div>
                                    <TextBoxWithLabel
                                        label="フリガナ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;フリガナ"
                                        width="8vw" // Uncomment to set a custom width
                                        value={textValue2}
                                        onChange={(e: any) => setTextValue2(e.target.value)}
                                        labelWidth='150px'
                                    />
                                    <TextBoxWithLabel
                                        labelWidth='150px'
                                        label="管理者名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 姓"
                                        width="8vw" // Uncomment to set a custom width
                                        value={textValue3}
                                        onChange={(e: any) => setTextValue3(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <TextBoxWithLabel
                                        label="フリガナ"
                                        width="12vw" // Uncomment to set a custom width
                                        value={textValue4}
                                        onChange={(e: any) => setTextValue4(e.target.value)}
                                    />
                                    <TextBoxWithLabel
                                        label="名"
                                        width="12vw" // Uncomment to set a custom width
                                        value={textValue5}
                                        onChange={(e: any) => setTextValue5(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="last-column">

                        <div className="last-row">
                            <div className="search-button" >
                                <ButtonAtom
                                    onClick={searchConditions}
                                    label="検索"
                                    width="70px"
                                    margin='0 5vw'
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </Box>
            <DataTable   // Customize header height
                headers={headers} data={data} maxHeight='calc(82vh - 260px)' onSelectionChange={handleSelectionChange} />
            <ButtonAtom
                onClick={searchConditions}
                label="閲覧"
                width="70px"
                margin='0 2vw'
            />
            <ButtonAtom
                onClick={searchConditions}
                label="編集"
                width="70px"
                margin='0 2vw'
            />
            <ButtonAtom
                onClick={searchConditions}
                label="削除"
                width="70px"
                margin='0 2vw'
            />
        </div>
    );
}

export default CompaniesList;


