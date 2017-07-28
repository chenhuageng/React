
import React, { PropTypes,Component } from 'react';
import { 
	Table, 
	Input, 
	Icon, 
	Button, 
	Row,
	Col,
	Popconfirm, 
	Pagination,
	Menu, 
	Dropdown 
} from 'antd'
import appData from './../../../assert/Ajax';
import '../../../App.css'
import './active.css'

export default class active extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			count: 1,
			total:0,
			listMess:{},
			pageSum:1,
			pageNum:1,
		};
		this.Router;
		this.mess = null;
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		appData._Storage('get',"userMess",(res) =>{
			this.userMess = res
			this._getEvent()
		})
	}

	_jump(nextPage,mess){
		this.Router(nextPage,mess,this.mess.nextPage)
	}

	//获取后台信息
	_getEvent(){
		let userMess = this.userMess;
		let afteruri = 'activity/list';
		let body = {
			 "comm_code": userMess.comm_code
		}
		appData._dataPost(afteruri,body,(res) => {
			let pageSum = Math.ceil(res.total/res.per_page)
			let data = res.data[0];
			// let arr = [];
			// data.forEach((value) =>{
			// 	let obj = this._listView(value);
			// 	arr.push(obj)
			// })
			let obj = this._listView(data);
			this.setState({
				dataSource: obj,
			})
		})
	}
	
	_listView(data){
		let peruri = 'http://cloudapi.famesmart.com'
		let ss = data.pic_path;
		let arr = ss.split(",");
		let typeText = ''
		if(data.type === 1 ){
			typeText = '社区服务'
		} else if(data.type === 2){
			typeText = '公益活动'
		} else if(data.type === 3){
			typeText = '其他'
		}
		return (
			<li className="box">
				<img className="imagebox" src={peruri+ arr[0]}/>  
				<div>
					<span style={{fontSize: 16,fontWeight: 'bold', marginRight: 20}}>{data.title}</span>
					<span style={{color: "#fdac41", fontSize: 16,}}>#{typeText}#</span>
				</div>
				<div>
					<span style={{fontSize: 12,fontWeight: 'bold', marginRight: 20}}>报名26</span>
					<span style={{fontSize: 12,fontWeight: 'bold', marginRight: 20}}>签到14</span>
				</div>
			</li>
		)
	}
	
	//操作栏功能
	_action(type,mess){
		if(type=== "sign"){
			this._jump('activity_sign', mess)
		} else if(type === "change"){
			this._jump('activity_add', mess)
		}else if(type === "refuse"){
			
		}
	}

	render() {
		const { dataSource } = this.state;
		let columns = this.columns;
		return (
		<div style={{padding: 5, backgroundColor: '#fff', height: 358}}>
			<div>
				<text style={{ height: 20, fontSize: 16,paddingBottom: 5}}>
					活动列表
				</text>
			</div>
			<ul style={{float:'left'}}>
				{this.state.dataSource}
			</ul>
		</div>
		);
	}
}