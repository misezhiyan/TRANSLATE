$(function() {
	// 创建菜单
	createAllRightMenu();
})
// 创建所有菜单
// 子菜单
var subMenuList2 = [ {
	'text' : '子菜单3',
	'subMenuList' : [],
	'fun' : testMenu4,
}, {
	'text' : '子菜单4',
	'fun' : testMenu5,
} ]
var subMenuList = [ {
//	'text' : '子菜单',
//	'fun' : testMenu3,
//}, {
	'text' : '子菜单2',
	'subMenuList' : subMenuList2,
} ]
// 菜单列表
var menuList = [ {
	'text' : '主菜单',
	'subMenuList' : subMenuList,
	'fun' : testMenu,
}, {
	'text' : '主菜单2',
	'fun' : testMenu2,
} ]

function createAllRightMenu() {
	// 创建菜单面板
	var menuspinner = menuspinner || rightMenu.createMenu(menuList);
	$('#menuContainer').append($(menuspinner));
	// 绑定展示菜单
	$('#menutest').showrightmenu($(menuspinner));
}
// 菜单关联方法
function testMenu() {
	alert('testMenu');
}
function testMenu2() {
	alert('testMenu2');
}
function testMenu3() {
	alert('testMenu3');
}
function testMenu4() {
	alert('testMenu4');
}
function testMenu5() {
	alert('testMenu5');
}