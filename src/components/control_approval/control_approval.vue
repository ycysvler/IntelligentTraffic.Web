<template>
  <div class="control_approvalWrapper">
    <div class="control_approval">
      <div class="approval_title">布控审批</div>
      <Tabs type="card" class="tabs">
        <TabPane label="待审批">
          <div style="display: flex;padding:0 10px 20px 10px">
            <span style="line-height: 32px;margin-right: 5px">申请人员</span>
            <Select v-model="tab1Apply" placeholder="请选择申请人员" style="width: 250px;" >
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </div>
          <div style="display: flex;padding:0 10px 20px 10px">
            <span style="line-height: 32px;margin-right: 5px">布控申请日期</span>
            <DatePicker type="daterange" split-panels placeholder="请选择布控申请日期" style="width: 225px"></DatePicker>
          </div>
          <div style="display: flex;padding:0 10px 20px 10px">
            <span style="line-height: 32px;margin-right: 5px">布控方式</span>
            <Select v-model="tab1Abnormal" placeholder="请选择布控方式" style="width: 250px;" >
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </div>
          <div style="display: flex;padding:0 10px 20px 10px">
            <span style="line-height: 32px;margin-right: 5px">布控编号</span>
            <Input style="width: 250px" v-model="tab1AbnormalNum" placeholder="请输入布控编号" />
          </div>
          <Button class="featureBtn" type="primary">提交</Button>
        </TabPane>
        <TabPane label="布控中">
          <div style="display: flex;padding:0 10px 20px 10px">
            <span style="line-height: 32px;margin-right: 5px">申请人员</span>
            <Select v-model="tab2Apply" placeholder="请选择申请人员" style="width: 250px;" >
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </div>
          <div style="display: flex;padding:0 10px 20px 10px">
            <span style="line-height: 32px;margin-right: 5px">布控申请日期</span>
            <DatePicker type="daterange" split-panels placeholder="请选择布控申请日期" style="width: 225px"></DatePicker>
          </div>
          <div style="display: flex;padding:0 10px 20px 10px">
            <span style="line-height: 32px;margin-right: 5px">布控方式</span>
            <Select v-model="tab2Abnormal" placeholder="请选择布控方式" style="width: 250px;" >
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </div>
          <div style="display: flex;padding:0 10px 20px 10px">
            <span style="line-height: 32px;margin-right: 5px">布控编号</span>
            <Input style="width: 250px" v-model="tab2AbnormalNum" placeholder="请输入布控编号" />
          </div>
          <Button class="featureBtn" type="primary">提交</Button>
        </TabPane>
        <TabPane label="已关闭">
          <div style="display: flex;padding:0 10px 20px 10px">
            <span style="line-height: 32px;margin-right: 5px">申请人员</span>
            <Select v-model="tab3Apply" placeholder="请选择申请人员" style="width: 250px;" >
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </div>
          <div style="display: flex;padding:0 10px 20px 10px">
            <span style="line-height: 32px;margin-right: 5px">布控申请日期</span>
            <DatePicker type="daterange" split-panels placeholder="请选择布控申请日期" style="width: 225px"></DatePicker>
          </div>
          <div style="display: flex;padding:0 10px 20px 10px">
            <span style="line-height: 32px;margin-right: 5px">布控方式</span>
            <Select v-model="tab3Abnormal" placeholder="请选择布控方式" style="width: 250px;" >
              <Option value="beijing">New York</Option>
              <Option value="shanghai">London</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </div>
          <div style="display: flex;padding:0 10px 20px 10px">
            <span style="line-height: 32px;margin-right: 5px">布控编号</span>
            <Input style="width: 250px" v-model="tab3AbnormalNum" placeholder="请输入布控编号" />
          </div>
          <Button class="featureBtn" type="primary">提交</Button>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import car_tool from '../car_tool/car_tool.vue'
  export default {
    data(){
      return {
        tab1Apply:'',
        tab1Abnormal:'',
        tab1AbnormalNum:'',
        tab2Apply:'',
        tab2Abnormal:'',
        tab2AbnormalNum:'',
        tab3Apply:'',
        tab3Abnormal:'',
        tab3AbnormalNum:'',
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .control_approvalWrapper
    .control_approval
      position:absolute
      top: 25px
      left: 25px
      width :388px
      height: 737px
      background:rgba(251,251,251,1);
      border-radius: 4px
      box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
      border-bottom: 1px solid rgba(213,213,213,0.5)
      .approval_title
        text-align: center
        padding :10px
        box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
        border-bottom: 1px solid rgba(213,213,213,0.5)
      .tabs
        margin-top 20px
        margin-left 10px
        .featureBtn
          width :50%
          height: 40px
          margin-left :24%
          margin-top : 50px
</style>
