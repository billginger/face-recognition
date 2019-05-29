# Face Recognition

a face recognition system created by Node.js & React

## Use Docker

### Run Nginx

* Pull Nginx image:

```
docker pull nginx
```

* 以挂载本地目录和配置文件的方式运行容器：

```
docker run --name nginx -d --network host -v /data/face-recognition/nginx:/etc/nginx -v /data/face-recognition:/app nginx
```

> 请注意：这里 nginx 容器使用了宿主网络，不需要映射端口，访问其它容器暴露的端口也会比较方便。

### When the configuration file is modified

* 重启容器使新的配置文件生效（不建议）：

```
docker restart nginx
```

* 进入容器，先验证配置文件，再重载配置文件：

```
docker exec -it nginx bash
nginx -t
nginx -s reload
```

* 在容器外，先验证配置文件，再重载配置文件：

```
docker exec nginx bash -c "nginx -t"
docker exec nginx bash -c "nginx -s reload"
```
