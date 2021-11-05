import axiosInstance from "./api";

const setup = (store) => {
    axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
          config.headers["Authorization"] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
  );

    axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
        const originalConfig = err.config;
        let token = localStorage.getItem('token');    
        let tt = new Date();
    
        if(token.exp < tt.getTime()){
        // Si token expiré mais moins de 5 minute
            if(tt.getTime() < token.exp+(5*60)  ){
                try {
                    const rs = await axiosInstance.post("/auth/refresh", {
                    refreshToken: localStorage.getItem("refreshToken"),
                    });
        
                    const { accessToken } = rs.data;
            
                    store.dispatch('auth/refresh', accessToken);
                    localStorage.setItem("token", accessToken);
            
                    return axiosInstance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshtoken');
            }
        }
        
        return Promise.reject(err);
    }
    );
};
    
export default setup;
  