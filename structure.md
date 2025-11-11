### DAB Structure

```
databricks-dab-vs-non-dab-release/
│
├── README.md
│
├── dab_release/
│   ├── databricks.yml
│   ├── src/
│   │   ├── etl_notebook.py
│   │   └── train_model.py
│   └── tests/
│       └── test_data_quality.py
│
├── non_dab_release/
│   ├── deploy_job_manual.py
│   ├── create_cluster_manual.py
│   ├── README.md
│
└── .gitignore
```