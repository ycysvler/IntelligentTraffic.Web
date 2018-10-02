<template>
  <div class="control_stabilityWrapper">
    <div class="control_stability">
      <div class="stability_title">车辆模糊布控</div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="box-shadow: 0 0 7px 0 rgba(213,213,213,0.5); border-bottom: 1px solid rgba(213,213,213,0.5)">
        <FormItem label="模糊车牌" prop="plateNum" style="padding-top: 15px;">
          <Input v-model="formValidate.plateNum" style="width: 300px;" placeholder="示例：**234**;黑A**123，多个车牌用 “ ; ” 隔开" />
        </FormItem>
        <FormItem label="布控类型" prop="controlType">
          <Select v-model="formValidate.controlType" placeholder="请选择布控类型" style="width: 300px;" >
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="布控时限">
          <Row>
            <Col span="10">
            <FormItem prop="startDate">
              <DatePicker type="date" placeholder="请输入起始时间" v-model="formValidate.startDate"></DatePicker>
            </FormItem>
            </Col>
            <Col span="3" style="text-align: center">-</Col>
            <Col span="10">
            <FormItem prop="endDate">
              <DatePicker type="date" placeholder="请输入起始时间" v-model="formValidate.endDate"></DatePicker>
            </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="布控时段">
          <TimePicker :value="formValidate.controlTime" format="HH’mm’ss" type="timerange" placement="bottom-end" placeholder="请选择布控时段" style="width: 300px;" ></TimePicker>
        </FormItem>
        <FormItem label="预警方式" prop="warning">
          <Select v-model="formValidate.warning" placeholder="请选择预警方式" style="width: 300px;" >
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="接收单位" prop="receive_mode">
          <Select v-model="formValidate.receive_mode" placeholder="请选择接收单位" style="width: 300px;" >
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>

        <FormItem label="布控原因" prop="desc">
          <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入布控原因" style="width: 300px;"  />
        </FormItem>
        <div class="control_tool">
          <car_tool></car_tool>
        </div>
        <FormItem>
          <Button class="featureBtn" type="primary" @click="handleSubmit('formValidate')">提交</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import car_tool from '../car_tool/car_tool.vue'
  export default {
    data () {
      return {
        formValidate: {
          plateNum: '',
          controlType:'',
          gender: '',
          interest: [],
          startDate: '',
          endDate: '',
          desc: '',
          controlTime:'',
          warning:'',
          receive_mode:''
        },
        ruleValidate: {
          plateNum: [
            { required: true, message: '请输入模糊车牌', trigger: 'blur' }
          ],
          controlType: [
            { required: true, message: '请选择布控类型', trigger: 'change' }
          ],
          warning: [
            { required: true, message: '请选择预警方式', trigger: 'change' }
          ],
          receive_mode: [
            { required: true, message: '请选择接收单位', trigger: 'change' }
          ],
          startDate: [
            { required: true, type: 'date', message: '请输入起始时间', trigger: 'change' }
          ],
          endDate: [
            { required: true, type: 'date', message: '请输入终止时间', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请输入布控原因', trigger: 'blur' },
            { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
          ]
        }
      }
    },
    //从vuex中action里拿到数据
    computed:{

    },
    watch:{

    },

    created(){

    },
    methods:{
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功');
          } else {
            this.$Message.error('请输入必填项');
          }
        })
      },
    },
    components:{
      car_tool,
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .control_stabilityWrapper
    .control_stability
      position:absolute
      top: 25px
      left: 25px
      width :388px
      background:rgba(251,251,251,1);
      border-radius: 4px
      box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
      border-bottom: 1px solid rgba(213,213,213,0.5)
      .control_tool
        padding: 10px 0 0 0
        box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
        border-bottom: 1px solid rgba(213,213,213,0.5)
      .stability_title
        text-align: center
        padding :10px
      .featureBtn
        width :50%
        height: 40px
        margin-left :12%
        margin-top : 50px

</style>
