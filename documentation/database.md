# database 总览
> 【可不可变】一般指是否会根据计划状态进行更新。【可不可修改】一般指用户可以在客户端手动修改该字段为期望值。
## projects
所有【创建过】的项目。如英语、前端之类的，项目内可以创建多个计划。
|字段|举例|类型|长度限制|描述|表关联|备注|
|----|----|----|----|----|----|----|
|id|1|number||project 的唯一标识，不可变，不可修改||项目中可以有多个 plan，比如【英语】project 中可以有 【背单词】和【阅读】plan|
|name|`英语`|string|1-8|不可变，可修改。||项目的名称(允许重复)|
|theme|1.1|char||不可变，不可修改。||项目主题颜色(整数位为 id，小数位为分类 warm(1) 或 cold(2))|
|create_at|1639301729|timestamp||默认记录创建时间。不可变，不可修改。||项目创建时间|
|end_at|1639301729|timestamp||可变，不可以修改。||项目终止时间，只能用户手动终止|
|status|1|number|1,10|默认值 1。可变，不可修改。||1，进行中（当前时间 <= 项目终止时间），10：已结束（当前时间 > 终止时间）
## plans
所有【创建过】的计划的信息
|字段|举例|类型|长度限制|描述|表关联|备注|
|----|----|----|----|----|----|----|
|id|1|number||不可变，不可修改<br />plan 的唯一标识。||一个 plan 下有一个或多个 records|plans.id = records.plan_id|
|project_id|1|number||不可变，不可修改|plans.project_id = projects.id|关联的 project，若无，则为普通计划，不会随 projects 的变化而变化|
|name|`背单词`|string|1-8|不可变，可修改||计划的名称(允许重复)|
|per|30|number|4|可变，不可修改|!plans.per && plans.per <= plans.total|每天需要完成的任务量，根据输入的 total 和 总共可完成计划天数 计算而来|
|unit|`个`|string|1-5|不可变，可修改||任务的单位|
|type|5|number|0-7|不可变，可修改||1-7：每周完成几天，0：某日完成（一次性计划）。修改后需重新计算当前 plan 的 per，并更新 records 相关信息。|
|level|1|number|1, 2, 3, 4|不可变，不可修改||会影响页面排序（优先级由高到低）|
|total|100|number|4|不可变，可修改（plans.loop === 0）||计划的总任务量，修改后需重新计算当前 plan 的 per，并更新 records 相关信息。|
|done|70|number|4|可变，不可修改||任务已完成的量|
|create_at|1639301729|timestamp||不可变，不可修改||计划创建时间|
|udpate_at|1639301729|timestamp||可变，不可修改||计划更新时间|
|start_at|1639301729|timestamp||不可变，可修改||计划开始时间|
|finish_at|1639301729|timestamp||不可变，可修改||预计结束时间（填写时 finish_at >= end_at。若 now < finish_at && status === （0 || 1），status 需置为 -1，且更新 end_at）|
|end_at|1639301729|timestamp||可变，可修改||计划结束时间。<br />自然结束（now > finish_at），提前完成(plans.total 等于 plans.id = records.plan_id 的 sum(records.done))，提前终止（用户设置 plan.status = -1）|
|status|1|number|0, 1, 10, -1，-2|可变(0 -> 1，1 -> 10)，可修改（1 -> -1）||0：未开始，1：进行中，10：已完成，-1：已终止，-2：保存的计划（每个用户只有一个已保存，下次创建计划时自动填写，已保存不与项目关联，即不记录 project_id）|

## records
创建计划后，即刻在 records 中生成记录 status = 0 的记录，完成当日任务时，更新该次记录。计划可更新，更新后重新计算未来待完成记录表（即 status = 0 的记录置为 -1，并重新创建新列表 status = 0，status = 1 的记录不做处理）
|字段|举例|类型|长度限制|描述|表关联|备注|
|----|----|----|----|----|----|----|
|id|1|number||不可变，不可修改<br />record 的唯一标识||
|plan_id|1|number||不可变，不可修改|plans.id = records.plan_id|任务 1 的某日完成记录|
|todo_at|1639301729|timestamp||不可变，不可修改||此记录待完成时间。当天多次完成，均在此记录中叠加|
|total|30|number||可变，不可修改||本日应该完成的任务量。plan 创建时自动生，成初始值为 plan.per。 |
|done|20|number||不可变，可修改||本日已经完成任务量。每日登陆时需检查：若前一天任务未完成，需要更新列表：a: status = 2，b: total = plans.remain/剩余记录条数。若前一天任务超额完成，需要更新列表：a. status = 3, b. 接下来的第 1 至 math.floor(plans.remain/plans.per) 条记录的 total = plans.per, 下一条记录的 total = plans.remain%plans.per|records.total <= plans.total，否则禁止记录，但允许 records.total >= plans.per|
|status|1|number|0,1,2,3,10|可变，不可修||0：未开始，1：正常, 10：已结束， -1：终止|

# theme
> 此表属于 assets，均不可变不可修改。

|字段|举例|类型|备注|
|----|----|----|----|
|id|1|number||
|type|1,2|number||
|normal|`#bbbbbb`|string||
|active|`#cccccc`|string||
