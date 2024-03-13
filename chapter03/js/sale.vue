<template>
  <!-- 商机详情-售中 -->
  <div ref="projectDetail" v-loading="loadStatus">
    <!-- 项目详情 -->
    <div class="section bgc-f3">
      <div class="content-title">
        <img :src="require('@/assets/icon/icon-detail.png')" />项目详情
        <span
          :class="isShowProjectDetail ? 'content-up' : 'content-down'"
          @click="isShowProjectDetail = !isShowProjectDetail"
        ></span>
      </div>
      <el-collapse-transition>
        <!-- <div v-show="isShowProjectDetail" class="pd-16 bdt-1-EB"> -->
        <div v-show="isShowProjectDetail" class="pd-16 bdt-1-EB">
          <!-- 销售合同解析 -->
          <div v-show="showSaleContract">
            <!-- <div> -->
            <div class="panel-title flex-align-center">销售合同解析</div>
            <div class="mgt-10 pdl-35 pdr-35">
              <!-- 项目交付方案 -->
              <!-- <div class="single-title">项目交付方案</div> -->
              <div v-show="SaleContract.contractStartDate">
                <el-form v-model="SaleContract" :inline-message="true">
                  <el-row>
                    <el-col v-show="SaleContract.contractStartDate" :span="8">
                      <el-form-item label="合同/订单开始时间：">
                        {{ SaleContract.contractStartDate }}
                      </el-form-item>
                    </el-col>
                    <el-col v-show="SaleContract.contractEndDate" :span="8">
                      <el-form-item label="合同/订单结束时间：">
                        {{ SaleContract.contractEndDate }}
                      </el-form-item>
                    </el-col>
                    <el-col v-show="SaleContract.contractSignTime" :span="8">
                      <el-form-item label="合同签约时间：">
                        {{ SaleContract.contractSignTime }}
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>

              <div
                v-show="
                  SaleContract.incomePartInfo &&
                    SaleContract.incomePartInfo.length > 0
                "
              >
                <!-- <div> -->
                <div class="single-title mgt-10 fw-bolder">收入部分</div>
                <div>
                  <el-table
                    :data="SaleContract.incomePartInfo"
                    :header-cell-style="{ background: '#E5F3FA' }"
                    style="width: 100%"
                  >
                    <el-table-column prop="TYPE" label="收入分类"></el-table-column>
                    <el-table-column prop="INCOME_NO_TAX" label="不含税">
                      <template slot-scope="scope">
                        {{
                          scope.row.INCOME_NO_TAX
                            ? scope.row.INCOME_NO_TAX
                            : "/"
                        }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="INCOME_TAX" label="税率">
                      <template slot-scope="scope">
                        {{ scope.row.INCOME_TAX ? scope.row.INCOME_TAX : "/" }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="INCOME_HAS_TAX" label="含税">
                      <template slot-scope="scope">
                        {{
                          scope.row.INCOME_HAS_TAX
                            ? $utils.standardNum(scope.row.INCOME_HAS_TAX, 2)
                            : "/"
                        }}
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>

              <div
                v-show="
                  JSON.stringify(
                    SaleContract.costInfo.PROJECT_DIRECT_COST_LIST
                  ) !== '[]' ||
                    JSON.stringify(
                      SaleContract.costInfo.PROJECT_SUPPORT_COST_INFO
                    ) !== '{}'
                "
              >
                <!-- <div> -->
                <div class="single-title mgt-10 fw-bolder">成本部分</div>
                <div>
                  <el-form v-model="SaleContract.costInfo">
                    <!-- 直接成本 -->
                    <div
                      v-show="
                        SaleContract.costInfo.PROJECT_DIRECT_COST_LIST &&
                          SaleContract.costInfo.PROJECT_DIRECT_COST_LIST.length >
                          0
                      "
                      class="my-bor-content"
                    >
                      <el-row type="flex" class="flex-justify-between my-warning pdl-15">
                        <el-col class="color-warning">
                          <el-form-item label="直接成本"></el-form-item>
                        </el-col>
                      </el-row>
                      <div
                        v-show="
                          SaleContract.costInfo.PROJECT_DIRECT_COST_LIST &&
                            SaleContract.costInfo.PROJECT_DIRECT_COST_LIST
                              .length > 0
                        "
                        class="pd-10"
                      >
                        <el-table
                          :data="SaleContract.costInfo.PROJECT_DIRECT_COST_LIST"
                          :header-cell-style="{ background: '#E5F3FA' }"
                          style="width: 100%"
                        >
                          <el-table-column prop="COST_DEPT_NAME" label="成本部门">
                          </el-table-column>
                          <el-table-column prop="SERVICE_COST_EXTERNAL" label="服务类成本（外采）">
                            <template slot-scope="scope">
                              {{
                                scope.row.SERVICE_COST_EXTERNAL
                                  ?
                                    $utils.standardNum(scope.row.SERVICE_COST_EXTERNAL, 2)
                                  : ""
                              }}
                            </template>
                          </el-table-column>
                          <el-table-column prop="HARDWARE_COST_SELF" label="硬件成本（自有）">
                            <template slot-scope="scope">
                              {{
                                scope.row.HARDWARE_COST_SELF
                                  ?
                                    $utils.standardNum(scope.row.HARDWARE_COST_SELF, 2)
                                  : ""
                              }}
                            </template>
                          </el-table-column>
                          <el-table-column prop="HARDWARE_COST_EXTERNAL" label="硬件成本（外采）">
                            <template slot-scope="scope">
                              {{
                                scope.row.HARDWARE_COST_EXTERNAL
                                  ?
                                    $utils.standardNum(scope.row.HARDWARE_COST_EXTERNAL, 2)
                                  : ""
                              }}
                            </template>
                          </el-table-column>
                          <el-table-column prop="FINISHED_SOFTWARE_EXTERNAL" label="成品软件成本（外采）">
                            <template slot-scope="scope">
                              {{
                                scope.row.FINISHED_SOFTWARE_EXTERNAL
                                  ?
                                    $utils.standardNum(scope.row.FINISHED_SOFTWARE_EXTERNAL, 2)
                                  : ""
                              }}
                            </template>
                          </el-table-column>
                          <el-table-column prop="INSTALL_SERVICE_COST_EXTERNAL" label="安装服务成本（外采）">
                            <template slot-scope="scope">
                              {{
                                scope.row.INSTALL_SERVICE_COST_EXTERNAL
                                  ?
                                    $utils.standardNum(scope.row.INSTALL_SERVICE_COST_EXTERNAL, 2)
                                  : ""
                              }}
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </div>

                    <!-- 支撑成本 -->
                    <div
                      v-show="
                        SaleContract.costInfo.PROJECT_SUPPORT_COST_INFO &&
                          SaleContract.costInfo.PROJECT_SUPPORT_COST_INFO
                            .MEMBER_COST_SELF
                      "
                      class="my-bor-content mgt-10"
                    >
                      <el-row type="flex" class="flex-justify-between my-warning pdl-15">
                        <el-col class="color-warning">
                          <el-form-item label="支撑成本"></el-form-item>
                        </el-col>
                      </el-row>
                      <el-row class="pd-10">
                        <el-col
                          v-show="
                            SaleContract.costInfo.PROJECT_SUPPORT_COST_INFO &&
                              SaleContract.costInfo.PROJECT_SUPPORT_COST_INFO
                                .MEMBER_COST_SELF
                          "
                          :span="8"
                        >
                          <el-form-item label="自有人员成本（人天）:">{{
                            SaleContract.costInfo.PROJECT_SUPPORT_COST_INFO &&
                              SaleContract.costInfo.PROJECT_SUPPORT_COST_INFO
                                .MEMBER_COST_SELF
                              ? $utils.standardNum(SaleContract.costInfo.PROJECT_SUPPORT_COST_INFO.MEMBER_COST_SELF, 2)
                              : ""
                          }}</el-form-item>
                        </el-col>
                        <el-col
                          v-show="
                            SaleContract.costInfo.PROJECT_SUPPORT_COST_INFO &&
                              SaleContract.costInfo.PROJECT_SUPPORT_COST_INFO
                                .TRAVEL_EXPENSE_COST
                          "
                          :span="8"
                        >
                          <el-form-item label="差旅费成本（元）:">{{
                            SaleContract.costInfo.PROJECT_SUPPORT_COST_INFO &&
                              SaleContract.costInfo.PROJECT_SUPPORT_COST_INFO
                                .TRAVEL_EXPENSE_COST
                              ?
                                $utils.standardNum(SaleContract.costInfo.PROJECT_SUPPORT_COST_INFO.TRAVEL_EXPENSE_COST, 2)
                              : ""
                          }}</el-form-item>
                        </el-col>
                        <el-col
                          v-show="
                            SaleContract.costInfo.PROJECT_SUPPORT_COST_INFO &&
                              SaleContract.costInfo.PROJECT_SUPPORT_COST_INFO
                                .PLATFORM_RESOURCES_USED_COST
                          "
                          :span="8"
                        >
                          <el-form-item label="平台资源池使用成本（元）:">{{
                            SaleContract.costInfo.PROJECT_SUPPORT_COST_INFO &&
                              SaleContract.costInfo.PROJECT_SUPPORT_COST_INFO
                                .PLATFORM_RESOURCES_USED_COST
                              ?
                                $utils.standardNum(SaleContract.costInfo.PROJECT_SUPPORT_COST_INFO.PLATFORM_RESOURCES_USED_COST,
                                                   2)
                              : ""
                          }}</el-form-item>
                        </el-col>
                      </el-row>
                      <!-- <div class="pd-10">
                      <el-table
                        :data="SaleContract.costInfo.PROJECT_SUPPORT_COST_LIST"
                        :header-cell-style="{ background: '#E5F3FA' }"
                        style="width: 100%"
                      >
                        <el-table-column prop="COST_DEPT_CODE" label="成本部门">
                        </el-table-column>
                        <el-table-column
                          prop="MEMBER_COST_SELF"
                          label="自有人员成本（人天）"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="TRAVEL_EXPENSE_COST"
                          label="差旅费成本（元）"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="PLATFORM_RESOURCES_USED_COST"
                          label="平台资源池使用成本（元）"
                        ></el-table-column>
                      </el-table>
                    </div> -->
                    </div>

                    <!-- 支撑成本 -->
                    <div
                      v-show="
                        SaleContract.costInfo.FUNDED_COST_MONEY &&
                          SaleContract.costInfo.ESTIMATED_FUNDED_MONEY &&
                          SaleContract.costInfo.ESTIMATED_FUNDED_TIME_BUCKET
                      "
                      class="my-bor-content mgt-10 mgb-10"
                    >
                      <el-row type="flex" class="flex-justify-between my-warning pdl-15">
                        <el-col class="color-warning">
                          <el-form-item label="垫资资金成本金额：">{{
                            $utils.standardNum(SaleContract.costInfo.FUNDED_COST_MONEY, 2)
                          }}</el-form-item>
                        </el-col>
                      </el-row>
                      <div class="pd-10">
                        <el-row type="flex" class="flex-wrap">
                          <el-col
                            v-show="
                              SaleContract.costInfo.ESTIMATED_FUNDED_MONEY
                            "
                            :span="8"
                          >
                            <el-form-item label="预估垫资金额：">
                              {{
                                SaleContract.costInfo.ESTIMATED_FUNDED_MONEY
                                  ?
                                    $utils.standardNum(SaleContract.costInfo.ESTIMATED_FUNDED_MONEY, 2)
                                  : ""
                              }}
                            </el-form-item>
                          </el-col>
                          <el-col
                            v-show="
                              SaleContract.costInfo.ESTIMATED_FUNDED_TIME_BUCKET
                            "
                            :span="16"
                          >
                            <el-form-item label="预估垫资时间段：">
                              {{
                                SaleContract.costInfo
                                  .ESTIMATED_FUNDED_TIME_BUCKET
                              }}
                            </el-form-item>
                          </el-col>
                          <!-- <el-col :span="8">
                          <el-form-item label="预估资金利息：">
                            {{}}
                          </el-form-item>
                        </el-col> -->
                        </el-row>
                      </div>
                    </div>
                  </el-form>
                </div>
              </div>

              <div v-show="SaleContract.linkContractInfo.PROJECT_NO" class="single-title fw-bolder">
                关联合同框架信息
              </div>
              <div v-show="SaleContract.linkContractInfo.PROJECT_NO" class="bor-content pdt-10 pdb-10 pdl-16 pdr-16">
                <el-form v-model="SaleContract" :inline-message="true">
                  <el-row>
                    <!--
                      售中详情可以点击项目编码
                      关联项目详情售中不可以点击项目编码
                    -->
                    <el-col v-if="canClick" :span="8">
                      <el-form-item label="项目编码：">
                        <span class="color-048 pointer" @click="toDetail">{{
                          SaleContract.linkContractInfo.PROJECT_NO
                        }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col v-else :span="8">
                      <el-form-item label="项目编码：">
                        <span>{{
                          SaleContract.linkContractInfo.PROJECT_NO
                        }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col v-show="SaleContract.linkContractInfo.PROJECT_NAME" :span="8">
                      <el-form-item label="项目名称：">
                        {{ SaleContract.linkContractInfo.PROJECT_NAME }}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col v-show="SaleContract.linkContractInfo.FRAMEWORK_DOSAGE" :span="8">
                      <el-form-item label="框架用量：">
                        {{ SaleContract.linkContractInfo.FRAMEWORK_DOSAGE }}
                      </el-form-item>
                    </el-col>
                    <el-col v-show="SaleContract.linkContractInfo.COLLECTING_PROGRESS" :span="8">
                      <el-form-item label="计收进度：">
                        {{ SaleContract.linkContractInfo.COLLECTING_PROGRESS }}
                      </el-form-item>
                    </el-col>
                    <el-col
                      v-show="
                        SaleContract.linkContractInfo.RETURN_MONEY_PROGRESS
                      "
                      :span="8"
                    >
                      <el-form-item label="回款进度：">
                        {{
                          SaleContract.linkContractInfo.RETURN_MONEY_PROGRESS
                        }}
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>

              <div v-show="SaleContract.linkOrderInfo.FRAMEWORK_DOSAGE">
                <!-- <div> -->
                <div class="single-title mgt-10 fw-bolder">
                  关联订单/结算合同信息
                </div>
                <div class="bor-content pdt-10 pdb-10 pdl-16 pdr-16">
                  <el-form v-model="SaleContract" :inline-message="true">
                    <el-row>
                      <el-col v-show="SaleContract.linkOrderInfo.FRAMEWORK_DOSAGE" :span="8">
                        <el-form-item label="框架用量：">
                          {{ SaleContract.linkOrderInfo.FRAMEWORK_DOSAGE }}
                        </el-form-item>
                      </el-col>
                      <el-col v-show="SaleContract.linkOrderInfo.COLLECTING_PROGRESS" :span="8">
                        <el-form-item label="计收进度：">
                          {{ SaleContract.linkOrderInfo.COLLECTING_PROGRESS }}
                        </el-form-item>
                      </el-col>
                      <el-col
                        v-show="
                          SaleContract.linkOrderInfo.RETURN_MONEY_PROGRESS
                        "
                        :span="8"
                      >
                        <el-form-item label="回款进度：">
                          {{ SaleContract.linkOrderInfo.RETURN_MONEY_PROGRESS }}
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                  <div
                    v-show="
                      SaleContract.linkOrderInfo
                        .CORRELATION_ORDER_CONTRACT_INFO &&
                        SaleContract.linkOrderInfo.CORRELATION_ORDER_CONTRACT_INFO
                          .length > 0
                    "
                  >
                    <el-table
                      :data="
                        SaleContract.linkOrderInfo
                          .CORRELATION_ORDER_CONTRACT_INFO
                      "
                      :header-cell-style="{ background: '#E5F3FA' }"
                      style="width: 100%"
                    >
                      <el-table-column prop="PROJECT_NO" label="项目编码">
                      </el-table-column>
                      <el-table-column prop="PROJECT_NAME" label="项目名称">
                      </el-table-column>
                      <el-table-column prop="REPLY_PLOY_NAME" label="项目金额"></el-table-column>
                      <el-table-column prop="EXPECTED_COMPLETION_DATE" label="预计完成日期"></el-table-column>
                      <el-table-column prop="CURRENT_NODE" label="当前节点">
                      </el-table-column>
                      <el-table-column prop="COLLECTING_PROGRESS" label="计收进度"></el-table-column>
                      <el-table-column prop="RETURN_MONEY_PROGRESS" label="回款进度"></el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 项目交付管理 -->
          <div>
            <div class="panel-title flex-align-center mgt-10">项目交付管理</div>
            <div class="mgt-10 pdl-35 pdr-35">
              <!-- 项目交付方案 -->
              <div
                v-show="
                  JSON.stringify(projectDeliver) !== '{}' &&
                    projectDeliver.FILE_DETAIL_LIST &&
                    projectDeliver.FILE_DETAIL_LIST.length > 0
                "
              >
                <!-- <div> -->
                <div class="single-title fw-bolder">项目交付方案</div>
                <div class="mgt-10 pdl-16 pdr-16 flex-justify-between flex-align-center">
                  <!-- 交付方案 -->
                  <div class="flex-center">
                    <span>交付方案：</span>
                  </div>
                  <div>
                    文档状态：<span class="color-048">{{
                      projectDeliver.FILE_STATUS
                    }}</span>
                  </div>
                </div>

                <div class="mgt-10">
                  <el-table
                    :data="projectDeliver.FILE_DETAIL_LIST"
                    size="medium"
                    :header-cell-style="{ background: '#E5F3FA' }"
                  >
                    <el-table-column prop="docDesc" label="附件名称" />
                    <el-table-column prop="author" label="上传人" />
                    <el-table-column prop="createDate" label="上传时间" />
                    <el-table-column prop="linkTypeName" label="上传环节" />
                    <el-table-column prop="docSize" label="大小">
                      <template slot-scope="scope">
                        {{
                          scope.row.docSize
                            ? Number(scope.row.docSize) > 1048576
                              ? (
                                Number(scope.row.docSize) /
                                1024 /
                                1024
                              ).toFixed(2) + "M"
                              : (Number(scope.row.docSize) / 1024).toFixed(2) +
                                "KB"
                            : ""
                        }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="docName" label="附件" width="260" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <el-row>
                          <el-col :span="2">
                            <img :src="checkImgType(scope.row.docName)" class="file-icon" />
                          </el-col>
                          <el-col :span="22" class="attachment-long-text">
                            <span
                              class="mgl-5"
                              :style="{ color: '#0A8BE6', cursor: 'pointer' }"
                              @click="downLoad(scope.row)"
                            >{{ scope.row.docName }}</span>
                          </el-col>
                        </el-row>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <!-- 项目交付日志 -->
              <div class="single-title mgt-16 fw-bolder">项目交付日志</div>
              <div class="mgt-10">
                当前合同节点：<span class="fz-18 color-048">{{
                  SaleContract.CURRENT_NODE_NAME
                }}</span>
              </div>
              <div class="mgt-10 flex-justify-between flex-align-center">
                <div
                  v-for="(item, i) of contractNodeList"
                  :key="'contractNodeList' + i"
                  :class="[
                    'col-3',
                    'pd-16',
                    i == contractNodeList.length - 1 ? '' : 'mgr-10',
                    'bgc-f7f',
                    'bdrs-5',
                    i == contractNodeList.length - 1 ? '' : 'bdr-1-EB',
                  ]"
                >
                  <el-row class="flex lh-15 mgt-15">
                    <div class="fz-36 fw-bolder color-primary">
                      {{ item.NODE_TOTAL }}
                    </div>
                    <div class="mgt-5 mgb-10 mgl-15 fz-16">
                      {{ item.CONTENT }}
                    </div>
                  </el-row>

                  <div class="flex-justify-between bgc-f3 pdt-5 pdb-5 pdl-10 pdr-10">
                    <div>
                      已完成： <span>{{ item.COMPLETED }}</span>
                    </div>
                    <div>
                      执行中： <span>{{ item.UNDERWAY }}</span>
                    </div>
                    <div>
                      超期：
                      <span :class="item.NODE_OVERDUE > 0 ? 'color-danger' : ''">{{ item.NODE_OVERDUE }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 初验 -->

              <!-- 第一级 -->
              <div v-for="(item, i) in tableData" :key="'tableData' + i" class="mgt-10">
                <ContractNodeLayout :base-info="item" class="mgt-10">
                  <template #content>
                    <div class="pd-16">
                      <el-form v-model="tableData[i]" inline-message class="inline-form">
                        <!-- <el-row style="
                          border-bottom: 1px solid rgba(226, 229, 233, 1);
                          padding-bottom: 20px;
                        ">
                        <el-col :span="6">
                          <div class="flex-align-center">
                            <span class="pdl-10 pdr-10 pdt-5 pdb-5 bgc-048 color-f3 contract_node">
                              <p class="contract_text">
                                {{ item.NODE_PLAN_TYPE }}
                              </p>
                            </span>
                            <span class="mgl-10 contract_title">{{
                              item.NODE_NAME
                            }}</span>
                          </div>
                          <el-form-item
                            label="合同节点:"
                            pdl-10
                            pdr-10
                            pdt-5
                            pdb-5
                            bgc-048
                            color-f3
                          >
                            {{ baseInfoForm.nodeType }}
                          </el-form-item>
                        </el-col>
                      </el-row> -->
                        <el-row v-show="item.NODE_PLAN_TYPE !== '2'" class="first_margin">
                          <el-col :span="6">
                            <el-form-item label="节点负责人：">
                              {{ item.RESPONSIBLE_NAME }}
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="计划开始时间：">
                              {{ pointDate(item.EXPECTED_START_DATE) }}
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="计划完成时间：">
                              {{ pointDate(item.EXPECTED_COMPLETION_DATE) }}
                            </el-form-item>
                          </el-col>
                        </el-row>

                        <!-- <div
                          v-if="item.NODE_PROGRESS_CHILDREN.length === 0"
                          class="middleProcess pdl-10 pdr-10 pdb-10 tc"
                        >
                          <img
                            style="width: 114.03px; height: 79px"
                            src="@/assets/icon/icon-nolog.png"
                          />
                          <p class="empty_title">暂无日志内容</p>
                        </div> -->

                        <div
                          v-for="(journal, j) in item.NODE_PROGRESS_CHILDREN"
                          :key="item.NODE_PROGRESS_CHILDREN + j"
                          class="middleProcess pdl-10 pdr-10 pdb-10 mgt-10"
                        >
                          <el-row class="row_margin_node" @click.native="showMore(journal)">
                            <el-col :span="6" style="padding-left: 20px">
                              <el-form-item label="更新时间:">
                                {{ updateDate(journal.UPDATE_DATE) }}
                              </el-form-item>
                            </el-col>
                            <el-col :span="8" class="first_margin" style="margin-left: 0px">
                              <el-form-item label="交付进度:">
                                {{ journal.NODE_PROGRESS }}%
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="节点是否完成:">
                                {{
                                  journal.STATUS
                                    ? journal.STATUS === "1"
                                      ? "是"
                                      : "否"
                                    : ""
                                }}
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <div
                            :class="
                              journal.FLAG === 'true' ? 'node-up' : 'node-down'
                            "
                            @click="showMore(journal)"
                          >
                            {{ journal.FLAG === "true" ? "收起" : "展开" }}
                          </div>
                          <el-collapse-transition>
                            <div v-show="journal.FLAG === 'true'">
                              <el-row>
                                <el-col :span="6" style="padding-left: 20px">
                                  <el-form-item label="操作:">
                                    主动上报
                                  </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                  <el-form-item label="实际开始时间:">
                                    {{ formatDate(journal.REALITY_START_DATE) }}
                                  </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                  <el-form-item label="实际完成时间:">
                                    {{ formatDate(journal.REALITY_END_DATE) }}
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-col style="padding-left: 20px" :span="14">
                                  <el-form-item label="工作内容:">{{
                                    journal.PROGRESS_DESC
                                  }}</el-form-item>
                                </el-col>

                                <el-col v-show="item.NODE_PLAN_TYPE !== '0'" :span="6">
                                  <el-form-item label="日志跟进进度:">{{
                                    logStatus(
                                      journal.STATUS,
                                      journal.AUDIT_STATUS
                                    )
                                  }}</el-form-item>
                                </el-col>
                              </el-row>

                              <el-row>
                                <el-col class="color-primary" style="padding-left: 20px">
                                  <el-form-item label="项目进度详情:">
                                    <div v-if="journal.SE_FILE_REL.length === 0">
                                      暂无附件
                                    </div>
                                    <div v-for="(file, p) in journal.SE_FILE_REL" v-else :key="journal.SE_FILE_REL + p">
                                      <a @click="downLoadFile(file)">
                                        {{ file.DOC_NAME }}.zip</a>
                                    </div>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                            </div>
                          </el-collapse-transition>
                        </div>
                        <!-- <div class="middleProcess pdl-10 pdr-10 pdb-10 tc">
                        <img
                          style="width:114.03px;height:79px ;"
                          src="@/assets/icon/icon-nolog.png"
                        />
                        <p class="empty_title">暂无日志内容</p>
                      </div> -->
                      </el-form>

                      <!-- 第二级 -->
                      <div v-for="(node, k) in item.CHILDREN" :key="item.CHILDREN + k">
                        <ContractNodeLayout :title="node.NODE_NAME" :base-info="node" class="mgt-10">
                          <template #content>
                            <div>
                              <el-form v-model="item.CHILDREN[k]" inline-message class="inline-form">
                                <el-row v-show="node.NODE_PLAN_TYPE !== '0'" class="">
                                  <el-col :span="6">
                                    <el-form-item label="节点负责人:">
                                      {{ node.RESPONSIBLE_NAME }}
                                    </el-form-item>
                                  </el-col>
                                  <el-col :span="6">
                                    <el-form-item label="计划开始时间:">
                                      {{ pointDate(node.EXPECTED_START_DATE) }}
                                    </el-form-item>
                                  </el-col>
                                  <el-col :span="8">
                                    <el-form-item label="计划完成时间:">
                                      {{
                                        pointDate(node.EXPECTED_COMPLETION_DATE)
                                      }}
                                    </el-form-item>
                                  </el-col>
                                </el-row>
                                <!-- <div
                                  v-if="
                                    node.NODE_PROGRESS_CHILDREN.length === 0
                                  "
                                  class="middleProcess pdl-10 pdr-10 pdb-10 tc"
                                >
                                  <img
                                    style="width: 114.03px; height: 79px"
                                    src="@/assets/icon/icon-nolog.png"
                                  />
                                  <p class="empty_title">暂无日志内容</p>
                                </div> -->
                                <div
                                  v-for="(journal,
                                          l) in node.NODE_PROGRESS_CHILDREN"
                                  :key="node.NODE_PROGRESS_CHILDREN + l"
                                  class="mgt-10"
                                >
                                  <div class="middleProcess pdl-10 pdr-10 pdb-10">
                                    <el-row class="row_margin_milepost" @click.native="showMore(journal)">
                                      <el-col :span="6" style="padding-left: 20px">
                                        <el-form-item label="更新时间:">
                                          {{ updateDate(journal.UPDATE_DATE) }}
                                        </el-form-item>
                                      </el-col>
                                      <el-col
                                        v-show="node.NODE_PLAN_TYPE === '0'"
                                        :span="8"
                                        class="first_margin"
                                        style="margin-left: 0px"
                                      >
                                        <el-form-item label="节点跟进人:">
                                          {{ journal.RESPONSIBLE_NAME }}
                                        </el-form-item>
                                      </el-col>

                                      <el-col
                                        v-show="node.NODE_PLAN_TYPE !== '0'"
                                        :span="8"
                                        class="first_margin"
                                        style="margin-left: 0px"
                                      >
                                        <el-form-item label="交付进度:">
                                          {{ journal.NODE_PROGRESS }}%
                                        </el-form-item>
                                      </el-col>
                                      <el-col v-show="node.NODE_PLAN_TYPE !== '0'" :span="6">
                                        <el-form-item label="节点是否完成:">
                                          {{
                                            journal.STATUS
                                              ? journal.STATUS === "1"
                                                ? "是"
                                                : "否"
                                              : ""
                                          }}
                                        </el-form-item>
                                      </el-col>
                                    </el-row>
                                    <div
                                      :class="
                                        journal.FLAG === 'true'
                                          ? 'node-up'
                                          : 'node-down'
                                      "
                                      @click="showMore(journal)"
                                    >
                                      {{
                                        journal.FLAG === "true"
                                          ? "收起"
                                          : "展开"
                                      }}
                                    </div>
                                    <el-collapse-transition>
                                      <div v-show="journal.FLAG === 'true'">
                                        <div>
                                          <el-row class="row_margin">
                                            <el-col :span="6" style="padding-left: 20px">
                                              <el-form-item label="操作:">
                                                主动上报
                                              </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                              <el-form-item label="实际开始时间:">
                                                {{
                                                  formatDate(
                                                    journal.REALITY_START_DATE
                                                  )
                                                }}
                                              </el-form-item>
                                            </el-col>
                                            <el-col :span="6">
                                              <el-form-item label="实际完成时间:">
                                                {{
                                                  formatDate(
                                                    journal.REALITY_END_DATE
                                                  )
                                                }}
                                              </el-form-item>
                                            </el-col>
                                          </el-row>
                                          <el-row class="row_margin">
                                            <el-col :span="14" style="padding-left: 20px">
                                              <el-form-item label=" 工作内容:">
                                                {{
                                                  journal.PROGRESS_DESC
                                                }}</el-form-item>
                                            </el-col>
                                            <el-col
                                              v-show="
                                                node.NODE_PLAN_TYPE !== '0'
                                              "
                                              :span="6"
                                            >
                                              <el-form-item label="日志跟进进度:">{{
                                                logStatus(
                                                  journal.STATUS,
                                                  journal.AUDIT_STATUS
                                                )
                                              }}</el-form-item>
                                            </el-col>
                                          </el-row>
                                          <el-row class="row_margin">
                                            <el-col :span="20" style="padding-left: 20px">
                                              <el-form-item label=" 项目进度详情:">
                                                <div
                                                  v-if="
                                                    journal.SE_FILE_REL
                                                      .length === 0
                                                  "
                                                >
                                                  暂无附件
                                                </div>
                                                <div
                                                  v-for="(file,
                                                          p) in journal.SE_FILE_REL"
                                                  v-else
                                                  :key="journal.SE_FILE_REL + p"
                                                >
                                                  <a @click="downLoadFile(file)">{{ file.DOC_NAME }}</a>
                                                </div>
                                              </el-form-item>
                                            </el-col>
                                          </el-row>
                                        </div>
                                      </div>
                                    </el-collapse-transition>
                                  </div>
                                </div>
                              </el-form>
                            </div>
                            <!-- 第三级 -->

                            <div v-for="(task, m) in node.CHILDREN" :key="node.CHILDREN + m">
                              <ContractNodeLayout
                                :no-log="task.NODE_PROGRESS_CHILDREN.length"
                                :title="task.NODE_NAME"
                                :base-info="task"
                                class="mgt-10"
                              >
                                <template #content>
                                  <div>
                                    <el-form v-model="node.CHILDREN[m]" inline-message class="inline-form">
                                      <el-row class="">
                                        <el-col :span="6">
                                          <el-form-item label="节点负责人:">
                                            {{ task.RESPONSIBLE_NAME }}
                                          </el-form-item>
                                        </el-col>
                                        <el-col :span="6">
                                          <el-form-item label="计划开始时间:">
                                            {{
                                              pointDate(
                                                task.EXPECTED_START_DATE
                                              )
                                            }}
                                          </el-form-item>
                                        </el-col>
                                        <el-col :span="6">
                                          <el-form-item label="计划完成时间:">
                                            {{
                                              pointDate(
                                                task.EXPECTED_COMPLETION_DATE
                                              )
                                            }}
                                          </el-form-item>
                                        </el-col>
                                      </el-row>
                                      <div
                                        v-if="
                                          task.NODE_PROGRESS_CHILDREN.length ===
                                            0
                                        "
                                        class="middleProcess pdl-10 pdr-10 pdb-10 tc"
                                      >
                                        <img style="width: 114.03px; height: 79px" src="@/assets/icon/icon-nolog.png" />
                                        <p class="empty_title">暂无日志内容</p>
                                      </div>
                                      <div
                                        v-for="(journal,
                                                l) in task.NODE_PROGRESS_CHILDREN"
                                        v-else
                                        :key="task.NODE_PROGRESS_CHILDREN + l"
                                        class="mgt-10"
                                      >
                                        <div class="middleProcess pdl-10 pdr-10 pdb-10">
                                          <el-row class="row_margin_task" @click.native="showMore(journal)">
                                            <el-col :span="7" style="padding-left: 20px">
                                              <el-form-item label="更新时间:">
                                                {{
                                                  updateDate(
                                                    journal.UPDATE_DATE
                                                  )
                                                }}
                                              </el-form-item>
                                            </el-col>
                                            <el-col :span="8" class="first_margin" style="margin-left: 0px">
                                              <el-form-item label="交付进度:">
                                                {{ journal.NODE_PROGRESS }}%
                                              </el-form-item>
                                            </el-col>
                                            <el-col :span="6">
                                              <el-form-item label="节点是否完成:">
                                                {{
                                                  journal.STATUS
                                                    ? journal.STATUS === "1"
                                                      ? "是"
                                                      : "否"
                                                    : ""
                                                }}
                                              </el-form-item>
                                            </el-col>
                                          </el-row>
                                          <div
                                            :class="
                                              journal.FLAG === 'true'
                                                ? 'node-up'
                                                : 'node-down'
                                            "
                                            @click="showMore(journal)"
                                          >
                                            {{
                                              journal.FLAG === "true"
                                                ? "收起"
                                                : "展开"
                                            }}
                                          </div>
                                          <el-collapse-transition>
                                            <div v-show="journal.FLAG === 'true'">
                                              <div>
                                                <el-row class="row_margin">
                                                  <el-col :span="7" style="padding-left: 20px">
                                                    <el-form-item label="操作:">
                                                      主动上报
                                                    </el-form-item>
                                                  </el-col>
                                                  <el-col :span="8">
                                                    <el-form-item label="实际开始时间:">
                                                      {{
                                                        formatDate(
                                                          journal.REALITY_START_DATE
                                                        )
                                                      }}
                                                    </el-form-item>
                                                  </el-col>
                                                  <el-col :span="6">
                                                    <el-form-item label="实际完成时间:">
                                                      {{
                                                        formatDate(
                                                          journal.REALITY_END_DATE
                                                        )
                                                      }}
                                                    </el-form-item>
                                                  </el-col>
                                                </el-row>
                                                <el-row class="row_margin">
                                                  <el-col :span="15" style="padding-left: 16px">
                                                    <el-form-item label=" 工作内容:">
                                                      {{
                                                        journal.PROGRESS_DESC
                                                      }}</el-form-item>
                                                  </el-col>
                                                  <el-col
                                                    v-show="
                                                      task.NODE_PLAN_TYPE !==
                                                        '0'
                                                    "
                                                    :span="8"
                                                  >
                                                    <el-form-item label="日志跟进进度:">{{
                                                      logStatus(
                                                        journal.STATUS,
                                                        journal.AUDIT_STATUS
                                                      )
                                                    }}</el-form-item>
                                                  </el-col>
                                                </el-row>
                                                <el-row class="row_margin">
                                                  <el-col :span="20" style="padding-left: 20px">
                                                    <el-form-item label=" 项目进度详情:">
                                                      <div
                                                        v-if="
                                                          journal.SE_FILE_REL
                                                            .length === 0
                                                        "
                                                      >
                                                        暂无附件
                                                      </div>
                                                      <div
                                                        v-for="(file,
                                                                p) in journal.SE_FILE_REL"
                                                        v-else
                                                        :key="
                                                          journal.SE_FILE_REL +
                                                            p
                                                        "
                                                      >
                                                        <a
                                                          @click="
                                                            downLoadFile(file)
                                                          "
                                                        >{{
                                                          file.DOC_NAME
                                                        }}</a>
                                                      </div>
                                                    </el-form-item>
                                                  </el-col>
                                                </el-row>
                                              </div>
                                            </div>
                                          </el-collapse-transition>
                                        </div>
                                      </div>
                                    </el-form>
                                  </div>
                                </template>
                              </ContractNodeLayout>
                            </div>
                          </template>
                        </ContractNodeLayout>
                      </div>
                    </div>
                  </template>
                </ContractNodeLayout>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <!-- 目录 -->
    <!-- <Catalogue :catalogue="catalogue" @scroll="scroll"></Catalogue> -->
    <!-- 返回顶部 -->
    <ReturnTop />
  </div>
</template>
<script>
// import Catalogue from '@/views/common/catalogue';
import ReturnTop from '@/views/common/returnTop';
import ContractNodeLayout from '@/views/workPack/projectManage/components/contractNodeLayout';
export default {
  components: {
    ReturnTop,
    ContractNodeLayout
  },
  props: {
    canClickProjectNo: Boolean
  },
  data() {
    return {
      info: {},
      loadStatus: false,
      isShowProjectDetail: true,
      isShowBegin: true, // 是否展开初验信息
      SaleContract: {
        // 销售合同解析
        contractStartDate: '',
        contractEndDate: '',
        contractSignTime: '',
        linkContractInfo: {}, // 关联框架合同信息
        linkOrderInfo: {}, // 关联订单/结算信息
        costInfo: {}, // 成本部分
        incomePartInfo: [] // 收入部分
      },
      projectDeliver: {}, // 项目交付方案
      nodeDate: [],
      catalogue: {
        className: 'section',
        list: ['项目详情', '流程轨迹']
      },
      testList: [
        // 初检节点测试list
        { id: 1, fold: false },
        { id: 2, fold: false }
      ],
      testList2: [
        // 项目里程碑节点测试list
        { id: 1, fold: false },
        { id: 2, fold: false }
      ],
      fileInfo: {
        DOC_NAME: '国家开发两个咖啡馆.doc'
      },
      baseInfoForm: {
        docStatus: '待会签',
        nodeType: '合同节点',
        nowStage: '初验',
        nodeLeader: '张三',
        planStartTime: '2022-10-04',
        planEndTime: '2022-10-20',
        peocess: '60%',
        isDealed: '否',
        updateTime: '2022-10-09'
      },
      tableData: [], // 树状数据
      contractNodeList: [], // 合同节点信息
      canClick: false // 是否可以点击售中详情的项目编码
    };
  },
  computed: {
    showSaleContract() {
      let temp = false;
      if (JSON.stringify(this.SaleContract.linkContractInfo) === '{}' && JSON.stringify(this.SaleContract.linkOrderInfo) === '{}' && JSON.stringify(this.SaleContract.costInfo) === '{}' && this.SaleContract.incomePartInfo.length === 0) {
        return false;
      }
      if (JSON.stringify(this.SaleContract.linkContractInfo) !== '{}' || JSON.stringify(this.SaleContract.linkOrderInfo.CORRELATION_ORDER_CONTRACT_INFO) !== '[]' || JSON.stringify(this.SaleContract.costInfo.PROJECT_SUPPORT_COST_INFO) !== '{}' || JSON.stringify(this.SaleContract.costInfo.PROJECT_DIRECT_COST_LIST) !== '[]' || this.SaleContract.incomePartInfo.length > 0) {
        temp = true;
      }
      return temp;
    }
  },
  watch: {
    canClickProjectNo(newV, oldV) {
      this.canClick = newV;
    }
  },
  mounted() {
    this.canClick = this.canClickProjectNo;
    this.info = this.$utils.getUrlParams();
    this.querySaleOppInfo();
    sessionStorage.setItem('PROJECTNO', this.info.PROJECT_NO);
    sessionStorage.setItem('TEMPLATEID', this.info.TEMPLATE_ID);
    this.qryNodeStaticalInfo();
    this.qryNodeData();
    // this.qryProjectBudgetIncome();
    this.qrySaleContractAnalysisInfo();
    this.qryProjectDeliveryPlanFile();

    // 更新父组件目录
    this.$parent.catalogue = this.catalogue;
  },
  methods: {
    // 查询销售合同解析信息
    qrySaleContractAnalysisInfo() {
      this.loadStatus = true;
      const param = {
        PROJECT_NO: this.info.PROJECT_NO
      };

      this.$post(
        this.cmiotDictView.common.qrySaleContractAnalysisInfo,
        param
      ).then(res => {
        this.loadStatus = false;
        if (
          res.data.ROOT.BODY.RETURN_CODE === '0' &&
          res.data.ROOT.BODY.RETURN_MSG === 'OK'
        ) {
          // console.log(res,'res from 查询销售合同解析信息')
          const outData = res.data.ROOT.BODY.OUT_DATA;

          this.SaleContract.contractStartDate = outData.CONTRACT_START_DATE;
          this.SaleContract.contractEndDate = outData.CONTRACT_END_DATE;
          this.SaleContract.contractSignTime = outData.CONTRACT_SIGN_TIME;

          this.SaleContract.linkContractInfo =
            outData.CORRELATION_FRAMEWORK_CONTRACT_INFO;
          this.SaleContract.linkOrderInfo =
            outData.CORRELATION_ORDER_CONTRACT_LIST;
          this.SaleContract.costInfo = outData.PROJECT_COST_PART_LIST;

          // 处理收入部分信息
          const incomePartInfo = outData.PROJECT_INCOME_PART;
          if (
            outData.PROJECT_INCOME_PART &&
            outData.PROJECT_INCOME_PART.HARDWARE_INCOME_HAS_TAX
          ) {
            this.dealIncomePartInfo(incomePartInfo);
          }
        }
        // else {
        // this.$commonUtil.messageBox.error( "", "", "查询销售合同解析信息失败" );
        // }
      });
      // .catch((error) => {
      //   console.log(error);
      //   this.$commonUtil.messageBox.error("", "", "查询销售合同解析信息异常");
      // });
    },
    // 查询项目交付方案
    qryProjectDeliveryPlanFile() {
      const param = {
        PROJECT_NO: this.info.PROJECT_NO
      };

      this.$post(
        this.cmiotDictView.common.qryProjectDeliveryPlanFile,
        param
      ).then(res => {
        if (
          res.data.ROOT.BODY.RETURN_CODE === '0' &&
          res.data.ROOT.BODY.RETURN_MSG === 'OK'
        ) {
          // console.log(res,'res from 查询项目交付方案')
          const outData = res.data.ROOT.BODY.OUT_DATA;
          this.projectDeliver = outData;
        }
        // else{
        //   this.$commonUtil.messageBox.error('',res.data.ROOT.BODY.RETURN_CODE,res.data.ROOT.BODY.RETURN_MSG)
        // }
      });
      // .catch((error) => {
      //     console.log(error);
      //     this.$commonUtil.messageBox.error('','','查询项目交付方案异常');
      // })
    },
    // 根据文件类型决定icon
    checkImgType(fileName) {
      return this.$utils.checkIconType(fileName);
    },
    // 附件下载
    downLoad(file) {
      const param = {
        DOC_ID: file.docId
      };
      this.$commonUtil.messageBox.confirm(
        '',
        `确认下载文件"${file.docName}"？`,
        () => {
          this.$download(
            this.cmiotDictView.common.downLoadFile,
            param,
            file.docName,
            () => { }
          ).then(() => {
            this.$commonUtil.messageBox.success('', '下载成功！');
          });
        }
      );
    },
    // 下载附件内容
    downFile() { },
    // 点击下载任务

    downLoadFile(data) {
      const inParam = {
        DOC_ID: data.DOC_ID
      };
      this.$commonUtil.messageBox.confirm(
        '',
        `确认下载文件"${data.DOC_NAME}"？`,
        () => {
          this.$download(
            this.cmiotDictView.common.downLoadFile,
            {
              ...inParam
            },
            data.DOC_NAME,
            () => { }
          ).then(() => {
            this.$commonUtil.messageBox.success('', '下载成功！');
          });
        }
      );
    },

    // 进入详情页面
    toDetail() {
      this.info.PROJECT_NO = this.SaleContract.linkContractInfo.PROJECT_NO;
      const parsms = this.$utils.getParams(this.info);
      window.parent.openNewTag({
        title: '关联项目详情@' + this.info.PROJECT_NO,
        path:
          window.location.origin +
          '/cmiot-dictweb/#/projectManage/associatedProjectDetail?' +
          parsms
      });

      // this.$router.push({
      //   path: "/cmiot-dictweb/#/projectManage/projectDetail?" + parsms
      // });
    },

    // 点击下载模板
    downLoadModule() { },
    // 查询数据节点
    qryNodeData() {
      const param = {
        PROJECT_NO: this.info.PROJECT_NO
      };
      const url = this.cmiotDictView.nodeTaskManage
        .qryProjectPlanningNodeInfoAndNodeProcessInfoContainCommonNode;
      this.$post(url, param).then(res => {
        if (
          res.data.ROOT.BODY.RETURN_CODE === '0' &&
          res.data.ROOT.BODY.RETURN_MSG === 'OK'
        ) {
          this.tableData = res.data.ROOT.BODY.OUT_DATA.CONTRACT_NODE;
        }
      });
    },
    // 查询节点统计信息
    qryNodeStaticalInfo() {
      this.loadStatus = true;
      const param = {
        PROJECT_NO: this.info.PROJECT_NO
        // PROJECT_NO: "CMCQABBICT20221008006",
      };
      const url = this.cmiotDictView.contractManagement.qryNodeStaticalInfo;
      this.$post(url, param).then(res => {
        this.loadStatus = false;
        if (
          res.data.ROOT.BODY.RETURN_CODE === '0' &&
          res.data.ROOT.BODY.RETURN_MSG === 'OK'
        ) {
          // console.log(res, 'res from 查询节点统计信息')
          const nodeInfo = res.data.ROOT.BODY.OUT_DATA;
          const conotract = {
            CONTENT: '合同节点总数'
          };
          const milestone = {
            CONTENT: '项目里程碑节点总数'
          };
          const task = {
            CONTENT: '任务节点总数'
          };

          for (var o in nodeInfo) {
            if (o.indexOf('CONTRACT') > -1) {
              // 合同
              const titleC = o.replace('CONTRACT_', '');
              conotract[`${titleC}`] = nodeInfo[o];
            } else if (o.indexOf('MILESTONE') > -1) {
              // 里程碑
              const titleM = o.replace('MILESTONE_', '');
              milestone[`${titleM}`] = nodeInfo[o];
            } else if (o.indexOf('TASK') > -1) {
              // 任务
              const titleT = o.replace('TASK_', '');
              task[`${titleT}`] = nodeInfo[o];
            }
          }

          this.contractNodeList.push(conotract);
          this.contractNodeList.push(milestone);
          this.contractNodeList.push(task);
          this.SaleContract.CURRENT_NODE_NAME = nodeInfo.CURRENT_NODE_NAME;

          // console.log(this.contractNodeList, 'contractNodeList');
        }
      });
    },
    dealIncomePartInfo(budgetIncomePartInfo) {
      const hardware = {
        TYPE: '硬件收入'
      };
      const service = {
        TYPE: '服务收入'
      };
      const other = {
        TYPE: '其他收入'
      };
      const projectMoney = {
        TYPE: '项目金额'
      };

      for (var o in budgetIncomePartInfo) {
        if (o.indexOf('HARDWARE') > -1) {
          // 合同
          const titleH = o.replace('HARDWARE_', '');
          hardware[`${titleH}`] = budgetIncomePartInfo[o];
        } else if (o.indexOf('SERVER') > -1) {
          // 里程碑
          const titleS = o.replace('SERVER_', '');
          service[`${titleS}`] = budgetIncomePartInfo[o];
        } else if (o.indexOf('OTHER') > -1) {
          // 任务
          const titleO = o.replace('OTHER_', '');
          other[`${titleO}`] = budgetIncomePartInfo[o];
        } else {
          const titleP = o.replace('PROJECT_MONEY', 'INCOME');
          projectMoney[`${titleP}`] = budgetIncomePartInfo[o];
        }
      }

      this.SaleContract.incomePartInfo.push(hardware);
      this.SaleContract.incomePartInfo.push(service);
      this.SaleContract.incomePartInfo.push(other);
      this.SaleContract.incomePartInfo.push(projectMoney);
    },
    // 查询关联框架合同信息
    qryCorrelationFrameworkContractInfo() {
      const param = {
        PROJECT_NO: this.info.PROJECT_NO
      };
      const url = this.cmiotDictView.contractManagement
        .qryCorrelationFrameworkContractInfo;
      this.$post(url, param).then(res => {
        const code = res.data.ROOT.BODY.RETURN_CODE;
        if (code === '0') {
          this.correlationFrameworkContract = res.data.ROOT.BODY.OUT_DATA;
        } else {
          this.$commonUtil.messageBox.error(
            '',
            res.data.ROOT.BODY.RETURN_CODE,
            res.data.ROOT.BODY.RETURN_MSG
          );
        }
      });
    },

    loadDict() {
      // 收入合同模式
      const param1 = {
        TABLE_EN_NAME: 'sale_opp',
        FIELD_EN_NAME: 'in_contract_mode'
      };
      this.$post(this.cmiotDictView.common.loadCodeList, {
        ...param1
      }).then(res => {
        if (res.data.ROOT.BODY.RETURN_CODE === '0') {
          const list = res.data.ROOT.BODY.OUT_DATA.OUT_PARAM;
          list.forEach(item => {
            if (this.baseInfoForm.CONTRACT_MODE === item.FIELD_VALUE) {
              this.baseInfoForm.CONTRACT_MODE = item.FIELD_DESC;
            }
          });
        }
        // else {
        //   this.$commonUtil.messageBox.error(
        //     '',
        //     res.data.ROOT.BODY.RETURN_CODE,
        //     res.data.ROOT.BODY.RETURN_MSG
        //   );
        // }
      });
      // 框架合同类型
      const param2 = {
        TABLE_EN_NAME: 'sale_opp',
        FIELD_EN_NAME: 'frame_contract_mode'
      };
      this.$post(this.cmiotDictView.common.loadCodeList, {
        ...param2
      }).then(res => {
        if (res.data.ROOT.BODY.RETURN_CODE === '0') {
          const list = res.data.ROOT.BODY.OUT_DATA.OUT_PARAM;
          list.forEach(item => {
            if (this.baseInfoForm.CONTRACT_TYPE === item.FIELD_VALUE) {
              this.baseInfoForm.CONTRACT_TYPE = item.FIELD_DESC;
            }
          });
        }
      });
      // 属地
      const param3 = {
        TABLE_EN_NAME: 'sale_opp',
        FIELD_EN_NAME: 'areacode'
      };
      this.$post(this.cmiotDictView.common.loadCodeList, {
        ...param3
      }).then(res => {
        // 关闭遮罩层
        if (res.data.ROOT.BODY.RETURN_CODE === '0') {
          const list = res.data.ROOT.BODY.OUT_DATA.OUT_PARAM;
          list.forEach(item => {
            if (this.baseInfoForm.PROVINCE_CODE === item.FIELD_VALUE) {
              this.baseInfoForm.PROVINCE_CODE = item.FIELD_DESC;
            }
          });
        }
      });
      // 产品主航道
      const param4 = {
        TABLE_EN_NAME: 'sale_opp',
        FIELD_EN_NAME: 'Product_main_channel'
      };
      this.$post(this.cmiotDictView.common.loadCodeList, {
        ...param4
      }).then(res => {
        if (res.data.ROOT.BODY.RETURN_CODE === '0') {
          const list = res.data.ROOT.BODY.OUT_DATA.OUT_PARAM;
          list.forEach(item => {
            if (this.baseInfoForm.MAIN_CHANNEL === item.FIELD_VALUE) {
              this.baseInfoForm.MAIN_CHANNEL = item.FIELD_DESC;
            }
          });
        }
      });
      // 项目类型
      const param5 = {
        TABLE_EN_NAME: 'sale_opp',
        FIELD_EN_NAME: 'project_type'
      };
      this.$post(this.cmiotDictView.common.loadCodeList, {
        ...param5
      }).then(res => {
        if (res.data.ROOT.BODY.RETURN_CODE === '0') {
          const list = res.data.ROOT.BODY.OUT_DATA.OUT_PARAM;
          list.forEach(item => {
            if (this.baseInfoForm.SALE_OPP_TYPE === item.FIELD_VALUE) {
              this.baseInfoForm.SALE_OPP_TYPE = item.FIELD_DESC;
            }
          });
        }
      });
      // 行业信息
      const param6 = {
        TABLE_EN_NAME: 'sale_opp',
        FIELD_EN_NAME: 'trade_type'
      };
      this.$post(this.cmiotDictView.common.loadCodeList, {
        ...param6
      }).then(res => {
        if (res.data.ROOT.BODY.RETURN_CODE === '0') {
          const list = res.data.ROOT.BODY.OUT_DATA.OUT_PARAM;
          list.forEach(item => {
            if (this.baseInfoForm.TRADE === item.FIELD_VALUE) {
              this.baseInfoForm.TRADE = item.FIELD_DESC;
            }
          });
        }
      });

      // 查询归属部门
      const param7 = {
        TABLE_EN_NAME: 'sale_opp',
        FIELD_EN_NAME: 'attribution_dep'
      };
      this.$post(this.cmiotDictView.common.loadCodeList, {
        ...param7
      }).then(res => {
        if (res.data.ROOT.BODY.RETURN_CODE === '0') {
          const list = res.data.ROOT.BODY.OUT_DATA.OUT_PARAM;
          list.forEach(item => {
            if (this.baseInfoForm.SALE_ORG_TYPE === item.FIELD_VALUE) {
              this.baseInfoForm.SALE_ORG_NAME = item.FIELD_DESC;
            }
          });
        }
      });
    },
    // 日志流程判断
    logStatus(status, AUDIT_STATUS) {
      if (status === '0') {
        return '进行中';
      } else {
        switch (AUDIT_STATUS) {
          case '0':
            return '已完成(待审核)';
          case '1':
            return '已完成(审核通过)';
          case '2':
            return '已完成(驳回)';
        }
      }
    },
    // 计划时间拼接
    pointDate(date) {
      if (date) {
        const time = date.slice(0, 10);
        return time;
      } else {
        return '';
      }
    },
    // 更新时间拼接
    updateDate(date) {
      if (date) {
        const year = date.slice(0, 4);
        const month = date.slice(4, 6);
        const day = date.slice(6, 8);
        const hour = date.slice(8, 10);
        const minute = date.slice(10, 12);
        const second = date.slice(12, 14);
        return (
          year +
          '-' +
          month +
          '-' +
          day +
          ' ' +
          hour +
          ':' +
          minute +
          ':' +
          second
        );
      } else {
        return '';
      }
    },
    // 时间格式
    formatDate(date) {
      if (date) {
        const year = date.slice(0, 4);
        const month = date.slice(4, 6);
        const day = date.slice(6, 8);
        return year + '-' + month + '-' + day;
      } else {
        return '';
      }
    },
    // 展开收起判断
    showMore(journal) {
      if (journal.FLAG === 'true') {
        this.$set(journal, 'FLAG', 'false');
        journal.FLAG = 'false';
      } else {
        journal.FLAG = 'true';
      }
    },
    /* 调用商机接口 */
    querySaleOppInfo() {
      this.loadStatus = true;
      const param1 = {
        PROJECT_NO: this.info.PROJECT_NO
      };
      this.$post(this.cmiotDictView.saleOpp.querySaleOppAndProject, {
        ...param1
      }).then(res => {
        this.loadStatus = false;
        const obj = res.data.ROOT.BODY.OUT_DATA;
        this.baseInfoForm.SALE_OPP_ID =
          obj.QUERY_SALE_OPP_OUT.SALE_OPP_ID || '';
        this.baseInfoForm.SALE_OPP_NAME =
          obj.QUERY_SALE_OPP_OUT.SALE_OPP_NAME || '';
        this.baseInfoForm.SALE_OPP_TYPE =
          obj.QUERY_SALE_OPP_OUT.SALE_OPP_TYPE || '';
        this.baseInfoForm.FIRST_RESPONSIBLE_NAME =
          obj.QUERY_SALE_OPP_OUT.FIRST_RESPONSIBLE_NAME || '';
        this.baseInfoForm.SALE_ORG_TYPE =
          obj.QUERY_SALE_OPP_OUT.SALE_ORG_TYPE || '';
        this.baseInfoForm.EXPECT_AMOUNT =
          String(obj.QUERY_SALE_OPP_OUT.EXPECT_AMOUNT) || '';
        this.baseInfoForm.PROVINCE_CODE = obj.PROJECT.PROVINCE_CODE || '';
        this.baseInfoForm.MAIN_CHANNEL = obj.PROJECT.MAIN_CHANNEL || '';
        this.baseInfoForm.TRADE = obj.PROJECT.TRADE || '';
        this.baseInfoForm.SALE_OPP_DESC =
          obj.QUERY_SALE_OPP_OUT.SALE_OPP_DESC || '';
        this.baseInfoForm.CONTRACT_MODE =
          obj.QUERY_SALE_OPP_OUT.CONTRACT_MODE || '';
        this.baseInfoForm.CONTRACT_TYPE =
          obj.QUERY_SALE_OPP_OUT.CONTRACT_TYPE || '';
        this.baseInfoForm.CONTACT_ID = obj.QUERY_SALE_OPP_OUT.CONTACT_ID || '';
        this.baseInfoForm.OPP_REMARK = obj.QUERY_SALE_OPP_OUT.OPP_REMARK || '';
        // this.fileList = baseInfoForm.DOCUMENT_LIST;
        this.custList = obj.QUERY_SALE_OPP_OUT.SALE_OPP_CUST_LIST;
        this.Subscribers = this.custList[0];
        if (this.custList.length > 1) {
          this.demandCustomer = obj.QUERY_SALE_OPP_OUT.SALE_OPP_CUST_LIST[1];
        }
        this.loadDict();
      });
    },
    scroll(data) {
      this.$emit('scroll', data);
    }
  }
};
</script>
<style scoped lang="scss">
.module {
  width: 100%;
  height: 50px;
  background: #e5f3fa;
}

.el-row {
  display: flex;
  flex-wrap: wrap;
}

.bdt-1-c3 {
  border-top: 1px solid #ccc;
}

.middleProcess {
  padding-top: 7px;
  position: relative;
  background-color: #fff;
  border: 1px solid rgb(235, 234, 234);
  border-radius: 4px;
  opacity: 1;
  // align-items: center;
  // padding: 0 10px;
  // position: relative;
  //span {
  //display: inline-block;
  //width: 3px;
  //height: 20px;
  //background-color: #048ed1;
  //position: absolute;
  //margin-top: 6px;
  //left: -1px;
  //}
}

.font_color {
  color: #606266 !important;
}

/deep/ .el-form-item {
  margin-bottom: 0 !important;
}

.contract_node {
  font-size: 12px;
  font-weight: 400;
  background: linear-gradient(90deg,
      rgba(128, 132, 234, 1) 0%,
      rgba(107, 107, 234, 1) 100%);
  opacity: 1;
  transform: skew(-15deg);
  border-radius: 7px;
}

.contract_title {
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 0px;
  color: rgba(108, 108, 234, 1) !important;
  text-align: left;
  vertical-align: top;
}

.contract_text {
  transform: skew(15deg);
}

.my-warning {
  background-color: #f4850e19 !important;
}

.my-warning /deep/ .el-form-item__label {
  color: #f4850e !important;
}

.my-warning {
  background-color: #f4850e19 !important;
}

.my-warning /deep/ .el-form-item__label {
  color: #f4850e !important;
}

.row_margin_node {
  cursor: pointer;
}

.row_margin_node::before {
  // border-left: 5px solid rgba(110, 110, 234, 1);

  content: "";
  width: 3px;
  height: 60%;
  background-color: rgba(110, 110, 234, 1);
  position: absolute;
  left: 0;
  top: 20%;
  transform: rotate();
  padding: 5px 0;
}

.row_margin {
  margin: 5px 0px !important;
}

.row_margin_milepost {
  cursor: pointer;
}

.row_margin_milepost::before {
  padding-left: 13px;
  content: "";
  width: 3px;
  height: 60%;
  background-color: rgba(247, 138, 81, 1) !important;
  position: absolute;
  left: 0;
  top: 20%;
  transform: rotate();
  padding: 5px 0;
}

.row_margin_task {
  cursor: pointer;
}

.row_margin_task::before {
  padding-left: 13px;
  content: "";
  width: 3px;
  height: 60%;
  background-color: rgba(49, 133, 235, 1) !important;
  position: absolute;
  left: 0;
  top: 20%;
  transform: rotate();
  padding: 5px 0;
}

.empty_title {
  margin-top: -5px;
  opacity: 1;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 22px;
  color: rgba(153, 153, 153, 1);
  text-align: center;
  vertical-align: top;
}

.first_margin {
  margin-left: 15px;
}

.my-bor-content {
  border: 2px solid #f7f8fa;
  //border-radius: 4px;
}

.my-bor-content {
  border: 2px solid #f7f8fa;
  //border-radius: 4px;
}

.file-icon {
  width: 20px;
}

.attachment-long-text{
  text-overflow: ellipsis;
  /* display: block; */
  overflow: hidden;
  color: #2b89e5;
}
</style>
