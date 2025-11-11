# Train ML model (mock)
from pyspark.ml.classification import LogisticRegression
from pyspark.ml.feature import VectorAssembler
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("Train Model").getOrCreate()

df = spark.read.parquet("/mnt/bronze/customers_clean")

assembler = VectorAssembler(inputCols=["age", "balance", "num_transactions"], outputCol="features")
train_df = assembler.transform(df).select("features", "churn")

model = LogisticRegression(labelCol="churn").fit(train_df)
model.save("/mnt/models/churn_model")
print(" Model training complete.")