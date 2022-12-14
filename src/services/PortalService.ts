import axios from "axios"
import SmartUrlSearchParams from "src/functions/SmartUrlSearchParams"
import BaseService from "./BaseService"

export interface PortalInterface {
  id?: number
  name?: number
  is_enable?: boolean
  data?: any
  portals_groups?: Array<any>

  portals_groups_ids?: Array<number>
}

export interface PortalServiceInterface extends PortalInterface {

}

const PortalService = {
  async add(props: PortalInterface) {
    try {
      let resData = await axios({
        method: "post",
        url: BaseService.PORTAL + '/add',
        data: props,
        headers: {
          // 'Content-Type': `multipart/form-data;`,
        }
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async update(props: PortalInterface) {
    try {
      let resData = await axios({
        method: "POST",
        url: BaseService.PORTAL + '/update',
        data: props,
        headers: {
          // 'Content-Type': `multipart/form-data;`,
        }
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async getById(id: number) {
    try {
      let resData = await axios({
        method: "GET",
        url: `${BaseService.PORTAL}/${id}/view`
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async gets(props: PortalServiceInterface) {
    try {
      let query = SmartUrlSearchParams(props);
      let resData = await axios({
        method: "GET",
        url: `${BaseService.PORTAL}/portals?${query}`
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },

  async getOwnGroups() {
    try {
      let resData = await axios({
        method: "GET",
        url: `${BaseService.PORTAL}/own-portals`
      });
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  async deletes(ids: Array<number>) {
    try {
      let resData = await axios({
        method: "POST",
        url: `${BaseService.PORTAL}/deletes`,
        data: {
          ids
        }
      })
      return resData.data;
    } catch (ex) {
      throw ex;
    }
  },
  user: {
    async getUsersByPortalId(portalId: number, props: any) {
      try {
        let query = SmartUrlSearchParams(props);
        let resData = await axios({
          method: "GET",
          url: `${BaseService.PORTAL}/user/users/portal/${portalId}/portal-id?${query}`
        });
        return resData.data;
      } catch (ex) {
        throw ex;
      }
    },
    async getUsersByWithoutPortalId(portalId: number, props: any) {
      try {
        let query = SmartUrlSearchParams(props);
        let resData = await axios({
          method: "GET",
          url: `${BaseService.PORTAL}/user/users/without-portal/${portalId}/portal-id?${query}`
        });
        return resData.data;
      } catch (ex) {
        throw ex;
      }
    },
    async joinPortal(pg_portal_id: number, user_id: number) {
      try {
        let resData = await axios({
          method: "POST",
          url: BaseService.PORTAL + '/user/portal/join',
          data: {
            user_id,
            pg_portal_id
          },
          headers: {
            // 'Content-Type': `multipart/form-data;`,
          }
        });
        return resData.data;
      } catch (ex) {
        throw ex;
      }
    },
  },
  position: {
    async getPositionsByPortalId(portalId: number, props: any) {
      try {
        let query = SmartUrlSearchParams(props);
        let resData = await axios({
          method: "GET",
          url: `${BaseService.PORTAL}/position/positions/portal/${portalId}/portal-id?${query}`
        });
        return resData.data;
      } catch (ex) {
        throw ex;
      }
    },
    async getPositionsWithoutPortalId(portalId: number, props: any) {
      try {
        let query = SmartUrlSearchParams(props);
        let resData = await axios({
          method: "GET",
          url: `${BaseService.PORTAL}/position/positions/without-portal/${portalId}/portal-id?${query}`
        });
        return resData.data;
      } catch (ex) {
        throw ex;
      }
    },
    async joinPortal(pg_portal_id: number, position_id: number) {
      try {
        let resData = await axios({
          method: "POST",
          url: BaseService.PORTAL + '/position/portal/join',
          data: {
            position_id,
            pg_portal_id
          },
          headers: {
            // 'Content-Type': `multipart/form-data;`,
          }
        });
        return resData.data;
      } catch (ex) {
        throw ex;
      }
    }
  }
}

export default PortalService;