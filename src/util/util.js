import Vue from 'vue'

//获取cookie
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

export function dateToStr(t) {
  var dt = new Date();
  dt.setTime(t);
  var m = dt.getMonth() + 1;

  var d = dt.getDate();
  var y = dt.getFullYear();
  var h = dt.getHours();
  var mi = dt.getMinutes();
  var s = dt.getSeconds();
  return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + (h < 10 ? "0" + h : h) + ":" + (mi < 10 ? "0" + mi : mi) + ":" + (s < 10 ? '0' + s : s);
};

export function dateToStrMinue(t) {
  var dt = new Date();
  dt.setTime(t);
  var m = dt.getMonth() + 1;

  var d = dt.getDate();
  var y = dt.getFullYear();
  var h = dt.getHours();
  var mi = dt.getMinutes();
  var s = dt.getSeconds();
  return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + (h < 10 ? "0" + h : h) + ":" + (mi < 10 ? "0" + mi : mi);
};

export function makeAddr(p, c, a) {
  var sz = ["北京", "天津", "上海", "重庆"];
  if (sz.indexOf(p) >= 0) {
    return c  + a;
  }
  else {
    return p + c + a;
  }
}




//删除cookie
export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};
/**
 * 根据条目编码找到对应的数据字典记录
 * @param {*} itemCode 数据字典条目编码
 * @param {*} data     数据字典条目数组
 */
const findConfigItem = function (itemCode, data) {
  for (let i in data) {
    if (itemCode === data[i].itemCode) {
      console.log("itemCode", itemCode);
      return data[i];
    }
  }
  return { title: "" };
}

export { findConfigItem }

export function dictionaryToFilter(d) {
  var sz = [];
  for (var i = 0; i < d.length; i++) {
    sz.push({ text: d[i].title, value: d[i].itemCode });
  }
  return sz;
}


const loadProvince = function (callback) {
  this
    .$axios({
      method: "post",
      url: "/base/getProvinceList",
      data: {
        moduleCode: "qy",
        parentId: 0
      }
    })
    .then((res) => {
      if (res.data.status === 200) {
        callback(res.data.data);
      }
    })
}

export { loadProvince }

export function loadDictionary(moduleCode) {
  let _this = this;
  this.$axios({
    method: "post",
    url: "/base/findDictionary",
    data: {
      moduleCode: moduleCode
    }
  }).then(res => {
    for (var key in res.data.data) {
      _this.$store.state.dictionary[key] = res.data.data[key];
    }

  })
}


export function checkImgType(imgType) {
  var sz = this.$store.state.dictionary.def_img_type;
  for (var i = 0; i < sz.length; i++) {
    if (sz[i].itemCode == imgType) {
      return true;
    }
  }
  return false;
}


export function checkAddr(callback) {
  let _this = this;
  _this.$axios({
    method: "post",
    url: "/addressManage/list",
    data: {
      status: "1",
      pageIndex: 1, //页数
      pageSize: 1, //条数
    }
  }).then((res) => {
    callback(res);
  })
}

export function checkLogin() {
  let _this = this;
  if (this.$store.state.accountObj.companyId == 0) {
    this.$alert('请登录后再执行此操作', '未登录', {
      confirmButtonText: '确定',
      callback: action => {
        _this.$router.push("/login");
      }
    });
    return false;
  }
  else if(this.$store.state.accountObj.active==false){
    this.$alert('请等待审核通过后再执行此操作', '未审批', {
      confirmButtonText: '确定',
      callback: action => {        
      }
    });
    return false;
  }
  return true;
}