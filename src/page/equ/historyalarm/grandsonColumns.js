import React from 'react';
import styles from './index.less';
import TextOverflow from '../../../components/TextOverflow';
/**
 * {anction表格的culumns}
 * @param {deleteClick} 删除按钮的回调
 * @param {editClick} 切换按钮的回调
 * @return {array}
 */
const columns = ({ getChildTable, _this }) => {
	return [
		{
			title: '名称',
			dataIndex: 'subDeviceName',
			className: 'information_th',
			width: '20%',
			render: (text, record, dex) => {
				return (
					<a
						className={styles['child_link']}
						onClick={getChildTable ? getChildTable.bind(_this, record) : () => {}}
					>
						<TextOverflow link={true}>{record.subDeviceName}</TextOverflow>
					</a>
				);
			}
		},
		{
			title: '编号',
			dataIndex: 'subDeviceID',
			className: 'information_th'
		},
		{
			title: '地址',
			dataIndex: 'adr',
			className: 'information_th'
		},
		{
			title: '类型',
			dataIndex: 'typeName',
			className: 'information_th'
		},
		{
			title: '标识',
			dataIndex: 'identyNO',
			className: 'information_th'
		},
		{
			title: '描述',
			dataIndex: 'rec',
			className: 'information_th'
		},
		{
			title: '告警',
			dataIndex: 'alerm_count',
			className: 'information_th'
		}
	];
};

export default columns;
