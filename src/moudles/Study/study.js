import React from 'react';
import { Table,Button,Input,Icon,message,Tabs} from 'antd';
import $ from 'jquery';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import styles from './styles.scss';
import axios from 'axios';
import {Link}from 'react-router';
const { TextArea } = Input;
const TabPane = Tabs.TabPane;
@CSSModules(styles)
export default class Study extends React.Component {
	static contextTypes = {
	    router: React.PropTypes.object
	};
	constructor(props){
		super(props);
		this.state={
			note:'',
			title:'',
			content:'',
			time:'',
		};
		this.loginguoqi=this.loginguoqi.bind(this);
	};
	loginguoqi(){
		localStorage.removeItem('userName');
		message.warning('登录过期咯！！！！');
		this.context.router.push(`/`);
	}
	componentDidMount(){
		axios.get('http://localhost:3000/note')
			.then(res=>{
				console.log(res);
				if(res.data.code=='nologin'){
					this.loginguoqi();
					return;
				}
					this.setState({
						note:res.data.data.list,
					});
					console.log(res.data);
				
			})
			.catch((err)=>{
				console.log(err);
			});
    }
    Delete(id){
    	axios.delete('http://localhost:3000/delete',{data:{id:id}})
    		.then(res=>{
    			if(res.data.code=='nologin'){
					this.loginguoqi();
					return;
				}
					message.success('笔记删除完毕，棒棒哒！！！');
	    			axios.get('http://localhost:3000/note')
						.then(res=>{
							this.setState({
								note:res.data.data.list,
							});
							console.log(res.data);
						})
						.catch((err)=>{
							console.log(err);
						});
    			
    		})
    		.catch(err=>{console.log(err);});
    }
	render(){
		const columns = [{
		  title: 'Num',
		  dataIndex: 'id',
			}, {
		  title: 'Title',
		  dataIndex: 'title',
		  render:(text,record)=>{
                return (<Link to={`/study/note/${record.id}`}>{text}</Link>)
            }
			}, {
		  title: 'Time',
		  dataIndex: 'time',
		},{
			title:'Action',
			dataIndex:'action',
			render:(text,record)=>{
				return (<Button onClick={this.Delete.bind(this,record.id)} type="primary" shape="circle" icon="delete" />)
			}
		}];
		let data;
		if(!!this.state.note){
			data=this.state.note.map(item=>({
				...item,
				key:item.id,
			}));
		}
		let Other=()=>{
			return(
				<div>
					<Link to="/study/addnote"><Button type="primary" style={{margin:10}}  icon="upload" >Add</Button></Link>
				</div>
			);
		};
		return(
			<div styleName="all">
				<Tabs defaultActiveKey="1">
				    <TabPane tab="笔记列表" key="1"><Table columns={columns} dataSource={data} size="middle" /></TabPane>
				    <TabPane tab="其他操作" key="2">{Other()}</TabPane>
				</Tabs>
				
			</div>
		);
	};
}